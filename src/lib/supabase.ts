import { createClient } from '@supabase/supabase-js';
import { UserRole } from '@/contexts/AuthContext';

// Create Supabase client
const supabaseUrl = 'https://iouuqypqvpicswzzcwpd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdXVxeXBxdnBpY3N3enpjd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjAzNTksImV4cCI6MjA1NzYzNjM1OX0.2LN6JCsaD4gMb8AuYezBD7wF4Pif_LZZ0PbFnttSvdw';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// User role management
export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
  
  return data?.role as UserRole || null;
};

export const setUserRole = async (userId: string, role: UserRole): Promise<boolean> => {
  // Check if user role already exists
  const { data: existingRole } = await supabase
    .from('user_roles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (existingRole) {
    // Update existing role
    const { error } = await supabase
      .from('user_roles')
      .update({ role })
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  } else {
    // Create new role
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role });
    
    if (error) {
      console.error('Error creating user role:', error);
      return false;
    }
  }
  
  return true;
};

// Data functions
export const fetchData = async (table: string) => {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data;
};

export const insertData = async (table: string, data: any) => {
  const { data: result, error } = await supabase.from(table).insert(data).select();
  if (error) throw error;
  return result;
};

export const updateData = async (table: string, id: string, data: any) => {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select();
  if (error) throw error;
  return result;
};

export const deleteData = async (table: string, id: string) => {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  return true;
};

// Team management functions
export interface UserData {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export const getAllTeamMembers = async (): Promise<UserData[]> => {
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      user_id,
      role,
      users:user_id (
        email,
        created_at
      )
    `);
  
  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
  
  return data.map((item: any) => ({
    id: item.user_id,
    email: item.users.email,
    role: item.role,
    created_at: item.users.created_at,
  }));
};

export const createAdminUser = async (email: string, password: string): Promise<boolean> => {
  try {
    // Create user in Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, 
    });
    
    if (userError) {
      console.error('Error creating admin user:', userError);
      return false;
    }
    
    // Set admin role if user was created successfully
    if (userData.user) {
      const success = await setUserRole(userData.user.id, 'admin');
      if (!success) {
        console.error('Failed to set admin role for user:', email);
        return false;
      }
      
      console.log(`Admin access created for ${email}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return false;
  }
};

export const inviteTeamMember = async (email: string, role: UserRole = 'viewer'): Promise<boolean> => {
  try {
    // Ensure specific emails get admin role
    const adminEmails = [
      'atharv@leveragedgrowth.co', 
      'sikander@leveragedgrowth.co'
    ];
    
    // Check if email should be an admin
    if (adminEmails.includes(email.toLowerCase()) || email.toLowerCase().includes('sikander')) {
      role = 'admin';
      console.log(`Setting admin role for ${email}`);
    }
    
    // Create user with password in Supabase
    const password = 'TemporaryPassword123!'; // In a real app, this would be randomly generated
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, 
    });
    
    if (userError) throw userError;
    
    // Set the user role if user was created successfully
    if (userData.user) {
      await setUserRole(userData.user.id, role);
      
      // This would be where you'd send an email with the invite in a real app
      // For now, we'll just return success
      
      // Create a simulated invite function call
      const { data, error } = await supabase.functions.invoke('invite-team-member', {
        body: { email, role, temporaryPassword: password }
      });
      
      if (error) console.warn('Error with invite function (expected in dev):', error);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error inviting team member:', error);
    return false;
  }
};

export const initializeAdminUsers = async () => {
  const adminUsers = [
    { email: 'atharv@leveragedgrowth.co', password: 'leveragedgrowth123' },
    { email: 'sikander@leveragedgrowth.co', password: 'leveragedgrowth123' }
  ];
  
  for (const user of adminUsers) {
    try {
      // Check if user already exists
      const { data } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      
      if (!data.user) {
        // User doesn't exist, create them
        await createAdminUser(user.email, user.password);
        console.log(`Created admin user: ${user.email}`);
      } else {
        // Ensure they have admin role
        await setUserRole(data.user.id, 'admin');
        console.log(`Ensured admin role for existing user: ${user.email}`);
      }
    } catch (error) {
      // User doesn't exist or other error
      await createAdminUser(user.email, user.password);
      console.log(`Created admin user after error check: ${user.email}`);
    }
  }
};

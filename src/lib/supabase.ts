
import { supabase } from '../App';

// Auth related functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
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

// User session
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Database operations - basic examples
export const fetchData = async (table: string) => {
  const { data, error } = await supabase
    .from(table)
    .select('*');
    
  if (error) throw error;
  return data;
};

export const insertData = async (table: string, data: any) => {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
    
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
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};

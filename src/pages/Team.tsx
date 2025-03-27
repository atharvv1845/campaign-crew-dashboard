
import React, { useEffect, useState } from 'react';
import TeamManagement from '@/components/team/TeamManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { fetchData } from '@/lib/supabase';

const TeamPage: React.FC = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userData = await fetchData('users');
          const currentUser = userData.find((u: any) => u.auth_id === user.id);
          setUserRole(currentUser?.role || 'Team Member');
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('Team Member');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchUserRole();
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 h-full flex items-center justify-center">
        <div className="animate-pulse">Loading team information...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 h-full space-y-6">
      {userRole === 'Admin' && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              You have administrator access to manage team members and their permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              As an admin, you can add, edit, or remove team members, and create login access for them to use the Leveraged Growth platform.
            </p>
          </CardContent>
        </Card>
      )}
      <TeamManagement />
    </div>
  );
};

export default TeamPage;

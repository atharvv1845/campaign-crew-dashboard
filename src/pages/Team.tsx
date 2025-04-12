
import React, { useEffect, useState } from 'react';
import TeamManagement from '@/components/team/TeamManagement';
import RoleManagement from '@/components/team/RoleManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { fetchData } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const TeamPage: React.FC = () => {
  const { user, isAdmin, userRole } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // We can now directly use userRole from the AuthContext
  // which is already being fetched when the user logs in

  // Show admin notification on first load
  useEffect(() => {
    if (isAdmin) {
      toast({
        title: "Admin access detected",
        description: "You have full administrative privileges for team management",
      });
    }
  }, [isAdmin, toast]);

  return (
    <div className="container mx-auto py-6 h-full space-y-6">
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              You have administrator access to manage team members, their permissions, and workspace settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              As an admin, you can add, edit, or remove team members, assign roles to control access levels, and manage workspace configuration for the Leveraged Growth platform.
            </p>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          {isAdmin && <TabsTrigger value="roles">Role Management</TabsTrigger>}
        </TabsList>
        <TabsContent value="members">
          <TeamManagement />
        </TabsContent>
        {isAdmin && (
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default TeamPage;

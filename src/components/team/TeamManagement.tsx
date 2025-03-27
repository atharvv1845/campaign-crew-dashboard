
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Plus, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TeamMembersList from './TeamMembersList';
import AddTeamMemberDialog from './AddTeamMemberDialog';
import { TeamMember } from './types';
import { useToast } from '@/hooks/use-toast';
import { useTeamStore } from '@/hooks/useTeamStore';
import { useAuth } from '@/contexts/AuthContext';
import { insertData, fetchData } from '@/lib/supabase';

const TeamManagement: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { teamMembers, addTeamMember, removeTeamMember, updateTeamMember } = useTeamStore();
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const userData = await fetchData('users');
          const currentUser = userData.find((u: any) => u.auth_id === user.id);
          setIsAdmin(currentUser?.role === 'Admin');
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      }
    };
    
    checkAdminStatus();
  }, [user]);

  // Filter team members based on search query and active tab
  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && member.status === 'Active';
    if (activeTab === 'pending') return matchesSearch && member.status === 'Pending';
    return matchesSearch;
  });

  const handleAddMember = async (member: TeamMember) => {
    setIsLoading(true);
    try {
      // Store in Supabase if we have a user
      if (user) {
        // Add to team_members table
        const result = await insertData('team_members', {
          name: member.name,
          email: member.email,
          phone: member.phone || null,
          role: member.role,
          bio: member.bio || null,
          status: member.status,
          created_by: user.id,
        });
        
        // Update the member with the Supabase ID
        if (result && result[0]) {
          member.id = result[0].id;
        }
      }
      
      // Add to local store
      addTeamMember(member);
      
      setShowAddMemberDialog(false);
      toast({
        title: "Team member added",
        description: `${member.name} has been added to the team.`
      });
    } catch (error) {
      console.error('Error adding team member:', error);
      toast({
        title: "Error adding team member",
        description: "An error occurred while adding the team member.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      setIsLoading(true);
      try {
        // Remove from database if we have a user
        if (user) {
          await deleteData('team_members', id);
        }
        
        // Remove from local store
        removeTeamMember(id);
        
        toast({
          title: "Team member removed",
          description: `${member.name} has been removed from the team.`
        });
      } catch (error) {
        console.error('Error removing team member:', error);
        toast({
          title: "Error removing team member",
          description: "An error occurred while removing the team member.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateMember = async (member: TeamMember) => {
    setIsLoading(true);
    try {
      // Update in database if we have a user
      if (user) {
        await updateData('team_members', member.id, {
          name: member.name,
          email: member.email,
          phone: member.phone || null,
          role: member.role,
          bio: member.bio || null,
          status: member.status,
        });
      }
      
      // Update in local store
      updateTeamMember(member);
      
      toast({
        title: "Team member updated",
        description: `${member.name}'s information has been updated.`
      });
    } catch (error) {
      console.error('Error updating team member:', error);
      toast({
        title: "Error updating team member",
        description: "An error occurred while updating the team member.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        {isAdmin && (
          <Button onClick={() => setShowAddMemberDialog(true)} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </>
            )}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="border-b px-6">
          <div className="flex items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search team members..."
                className="pl-9 pr-4 py-2 border border-input bg-transparent rounded-md w-[250px] text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs 
            defaultValue="all" 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="all">All Members</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <TeamMembersList 
                teamMembers={filteredTeamMembers} 
                onUpdate={handleUpdateMember}
                onRemove={handleRemoveMember}
                isAdmin={isAdmin}
              />
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              <TeamMembersList 
                teamMembers={filteredTeamMembers} 
                onUpdate={handleUpdateMember}
                onRemove={handleRemoveMember}
                isAdmin={isAdmin}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              <TeamMembersList 
                teamMembers={filteredTeamMembers} 
                onUpdate={handleUpdateMember}
                onRemove={handleRemoveMember}
                isAdmin={isAdmin}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isAdmin && (
        <AddTeamMemberDialog 
          open={showAddMemberDialog} 
          onOpenChange={setShowAddMemberDialog}
          onAdd={handleAddMember}
          withAccess={true}
        />
      )}
    </div>
  );
};

export default TeamManagement;

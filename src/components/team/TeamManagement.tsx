
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TeamMembersList from './TeamMembersList';
import AddTeamMemberDialog from './AddTeamMemberDialog';
import { TeamMember } from './types';
import { useToast } from '@/hooks/use-toast';
import { useTeamStore } from '@/hooks/useTeamStore';

const TeamManagement: React.FC = () => {
  const { toast } = useToast();
  const { teamMembers, addTeamMember, removeTeamMember, updateTeamMember } = useTeamStore();
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

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

  const handleAddMember = (member: TeamMember) => {
    addTeamMember(member);
    setShowAddMemberDialog(false);
    toast({
      title: "Team member added",
      description: `${member.name} has been added to the team.`
    });
  };

  const handleRemoveMember = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      removeTeamMember(id);
      toast({
        title: "Team member removed",
        description: `${member.name} has been removed from the team.`
      });
    }
  };

  const handleUpdateMember = (member: TeamMember) => {
    updateTeamMember(member);
    toast({
      title: "Team member updated",
      description: `${member.name}'s information has been updated.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <Button onClick={() => setShowAddMemberDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
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
              />
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              <TeamMembersList 
                teamMembers={filteredTeamMembers} 
                onUpdate={handleUpdateMember}
                onRemove={handleRemoveMember}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              <TeamMembersList 
                teamMembers={filteredTeamMembers} 
                onUpdate={handleUpdateMember}
                onRemove={handleRemoveMember}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddTeamMemberDialog 
        open={showAddMemberDialog} 
        onOpenChange={setShowAddMemberDialog}
        onAdd={handleAddMember}
      />
    </div>
  );
};

export default TeamManagement;

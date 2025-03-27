
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { deleteData, updateData, fetchData, insertData } from '@/lib/supabase';
import { TeamMember } from './types';
import { useTeamStore } from '@/hooks/useTeamStore';
import { cn } from '@/lib/utils';
import { 
  MoreHorizontal, 
  Search, 
  UserPlus, 
  Trash2, 
  Edit, 
  Mail 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AddTeamMemberDialog from './AddTeamMemberDialog';
import EditTeamMemberDialog from './EditTeamMemberDialog';
import DeleteTeamMemberDialog from './DeleteTeamMemberDialog';
import CreateTeamAccessDialog from './CreateTeamAccessDialog';

const TeamManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateAccessDialogOpen, setIsCreateAccessDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get team members from store and setter
  const teamMembers = useTeamStore((state) => state.teamMembers);
  const setTeamMembers = useTeamStore((state) => state.setTeamMembers);
  
  // Fetch team members on component mount
  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const data = await fetchData('team_members');
        setTeamMembers(data || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
        toast({
          title: 'Error',
          description: 'Failed to load team members.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTeamMembers();
  }, [setTeamMembers, toast]);
  
  // Filter team members based on search query
  const filteredMembers = teamMembers.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const handleAddMember = async (newMember: TeamMember) => {
    try {
      const result = await insertData('team_members', newMember);
      setTeamMembers([...teamMembers, result[0]]);
      toast({
        title: 'Success',
        description: 'Team member added successfully',
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to add team member',
        variant: 'destructive',
      });
    }
  };
  
  const handleEditMember = async (updatedMember: TeamMember) => {
    try {
      await updateData('team_members', updatedMember.id, updatedMember);
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === updatedMember.id ? updatedMember : member
        )
      );
      toast({
        title: 'Success',
        description: 'Team member updated successfully',
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to update team member',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteMember = async () => {
    if (!selectedMember) return;
    
    try {
      await deleteData('team_members', selectedMember.id);
      setTeamMembers(teamMembers.filter((member) => member.id !== selectedMember.id));
      toast({
        title: 'Success',
        description: 'Team member removed successfully',
      });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove team member',
        variant: 'destructive',
      });
    }
  };
  
  const handleCreateAccess = async (memberWithAccess: TeamMember) => {
    try {
      await updateData('team_members', memberWithAccess.id, { 
        ...memberWithAccess,
        hasAccess: true
      });
      
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === memberWithAccess.id ? { ...member, hasAccess: true } : member
        )
      );
      
      toast({
        title: 'Success',
        description: `Access created for ${memberWithAccess.name}`,
      });
      
      setIsCreateAccessDialogOpen(false);
    } catch (error) {
      console.error('Error creating access:', error);
      toast({
        title: 'Error',
        description: 'Failed to create access',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Members</CardTitle>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-9"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-pulse">Loading team members...</div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-muted-foreground">No team members found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          member.role === "Admin" 
                            ? "border-primary/40 bg-primary/10 text-primary" 
                            : "border-muted"
                        )}
                      >
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          member.status === "Active" 
                            ? "border-green-500/40 bg-green-500/10 text-green-500" 
                            : member.status === "Pending" 
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                            : "border-red-500/40 bg-red-500/10 text-red-500"
                        )}
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {member.hasAccess ? (
                        <Badge 
                          variant="outline" 
                          className="border-green-500/40 bg-green-500/10 text-green-500 text-xs"
                        >
                          Has Access
                        </Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-7 gap-1"
                          onClick={() => {
                            setSelectedMember(member);
                            setIsCreateAccessDialogOpen(true);
                          }}
                        >
                          <Mail className="h-3 w-3" />
                          Create Access
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedMember(member);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500 focus:text-red-500"
                            onClick={() => {
                              setSelectedMember(member);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {/* Dialogs */}
      <AddTeamMemberDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
        onSubmit={handleAddMember}
      />
      
      {selectedMember && (
        <>
          <EditTeamMemberDialog 
            open={isEditDialogOpen} 
            onOpenChange={setIsEditDialogOpen} 
            member={selectedMember}
            onSubmit={handleEditMember}
          />
          
          <DeleteTeamMemberDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            member={selectedMember}
            onDelete={handleDeleteMember}
          />
          
          <CreateTeamAccessDialog
            open={isCreateAccessDialogOpen}
            onOpenChange={setIsCreateAccessDialogOpen}
            member={selectedMember}
            onSubmit={handleCreateAccess}
          />
        </>
      )}
    </Card>
  );
};

export default TeamManagement;

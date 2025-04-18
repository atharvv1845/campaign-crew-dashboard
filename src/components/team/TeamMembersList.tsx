
import React, { useState } from 'react';
import { TeamMember } from './types';
import { MoreHorizontal, Pencil, Trash2, Mail, UserPlus, Key } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import EditTeamMemberDialog from './EditTeamMemberDialog';
import DeleteTeamMemberDialog from './DeleteTeamMemberDialog';
import CreateTeamAccessDialog from './CreateTeamAccessDialog';

interface TeamMembersListProps {
  teamMembers: TeamMember[];
  onUpdate: (member: TeamMember) => void;
  onRemove: (id: string) => void;
  isAdmin?: boolean;
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({ 
  teamMembers, 
  onUpdate, 
  onRemove,
  isAdmin = false
}) => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [creatingAccessForMember, setCreatingAccessForMember] = useState<TeamMember | null>(null);

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
  };

  const handleDelete = (member: TeamMember) => {
    setDeletingMember(member);
  };

  const handleCreateAccess = (member: TeamMember) => {
    setCreatingAccessForMember(member);
  };

  const handleUpdate = (member: TeamMember) => {
    onUpdate(member);
    setEditingMember(null);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Sales Rep':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <UserPlus className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No team members added yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add team members to collaborate on campaigns and manage leads together.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Email</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Role</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Access</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {teamMembers.map((member) => (
            <tr key={member.id} className="hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    {member.phone && (
                      <div className="text-xs text-muted-foreground">{member.phone}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-sm">{member.email}</td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={getRoleBadgeColor(member.role)}>
                  {member.role}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={getStatusBadgeColor(member.status)}>
                  {member.status}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={member.hasAccess ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}>
                  {member.hasAccess ? "Has Access" : "No Access"}
                </Badge>
              </td>
              <td className="py-3 px-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => handleEdit(member)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    
                    {isAdmin && !member.hasAccess && (
                      <DropdownMenuItem onClick={() => handleCreateAccess(member)}>
                        <Key className="h-4 w-4 mr-2" />
                        Create Access
                      </DropdownMenuItem>
                    )}
                    
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive" 
                          onClick={() => handleDelete(member)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingMember && (
        <EditTeamMemberDialog
          open={!!editingMember}
          onOpenChange={() => setEditingMember(null)}
          teamMember={editingMember}
          onUpdate={handleUpdate}
        />
      )}

      <DeleteTeamMemberDialog
        open={!!deletingMember}
        onOpenChange={() => setDeletingMember(null)}
        teamMember={deletingMember}
        onConfirm={() => {
          deletingMember && onRemove(deletingMember.id);
          setDeletingMember(null);
        }}
      />

      {creatingAccessForMember && (
        <CreateTeamAccessDialog
          open={!!creatingAccessForMember}
          onOpenChange={() => setCreatingAccessForMember(null)}
          teamMember={creatingAccessForMember}
          onConfirm={(updatedMember) => {
            onUpdate(updatedMember);
            setCreatingAccessForMember(null);
          }}
        />
      )}
    </div>
  );
};

export default TeamMembersList;

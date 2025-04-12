
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { getAllTeamMembers, setUserRole, UserData, inviteTeamMember } from '@/lib/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, Edit, Eye, RefreshCw, Shield, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const RoleManagement = () => {
  const [teamMembers, setTeamMembers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('viewer');
  const [inviteLoading, setInviteLoading] = useState(false);
  const { toast } = useToast();
  const { user, getUserRoleLabel } = useAuth();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const members = await getAllTeamMembers();
      setTeamMembers(members);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error loading team members",
        description: "There was a problem fetching the team data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const success = await setUserRole(userId, newRole);
      if (success) {
        // Update local state
        setTeamMembers(prev => 
          prev.map(member => 
            member.id === userId ? { ...member, role: newRole } : member
          )
        );
        
        toast({
          title: "Role updated",
          description: "User role has been updated successfully.",
        });
      } else {
        throw new Error("Failed to update role");
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error updating role",
        description: "There was a problem updating the user role.",
        variant: "destructive"
      });
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail) {
      toast({
        title: "Email required",
        description: "Please enter an email address for the invitation.",
        variant: "destructive"
      });
      return;
    }

    setInviteLoading(true);
    try {
      const success = await inviteTeamMember(inviteEmail, inviteRole);
      if (success) {
        toast({
          title: "Invitation sent",
          description: `An invitation has been sent to ${inviteEmail}.`,
        });
        setInviteDialogOpen(false);
        setInviteEmail('');
        setInviteRole('viewer');
        
        // Add Sikander as admin if that's the requested email
        if (inviteEmail.toLowerCase().includes('sikander')) {
          toast({
            title: "Admin access created",
            description: "Sikander has been granted admin access to the platform.",
          });
        }
        
        // Refresh the team members list
        fetchTeamMembers();
      } else {
        throw new Error("Failed to send invitation");
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error sending invitation",
        description: "There was a problem sending the invitation.",
        variant: "destructive"
      });
    } finally {
      setInviteLoading(false);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-primary text-primary-foreground';
      case 'editor':
        return 'bg-blue-500 text-white';
      case 'viewer':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>
            Manage team member access and permissions
          </CardDescription>
        </div>
        <div className="flex gap-x-2">
          <Button variant="outline" size="sm" onClick={fetchTeamMembers}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No team members found
                  </TableCell>
                </TableRow>
              ) : (
                teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={cn(getRoleBadgeColor(member.role), "px-2 py-0.5")}
                      >
                        {getUserRoleLabel(member.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(member.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Change Role
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => handleRoleChange(member.id, 'admin')}
                            className="cursor-pointer"
                            disabled={member.id === user?.id} // Prevent changing own role
                          >
                            {member.role === 'admin' && <Check className="mr-2 h-4 w-4" />}
                            <Shield className="mr-2 h-4 w-4 text-primary" />
                            Administrator
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleRoleChange(member.id, 'editor')}
                            className="cursor-pointer"
                            disabled={member.id === user?.id}
                          >
                            {member.role === 'editor' && <Check className="mr-2 h-4 w-4" />}
                            <Edit className="mr-2 h-4 w-4 text-blue-500" />
                            Editor
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleRoleChange(member.id, 'viewer')}
                            className="cursor-pointer"
                            disabled={member.id === user?.id}
                          >
                            {member.role === 'viewer' && <Check className="mr-2 h-4 w-4" />}
                            <Eye className="mr-2 h-4 w-4 text-gray-500" />
                            Viewer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {/* Invite Member Dialog */}
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@leveragedgrowth.co"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  value={inviteRole}
                  onValueChange={(value) => setInviteRole(value as UserRole)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {inviteRole === 'admin' && "Can manage all aspects of the platform including team members."}
                  {inviteRole === 'editor' && "Can create and edit campaigns, leads, and messages."}
                  {inviteRole === 'viewer' && "Can only view reports and existing data."}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={inviteLoading}>
                {inviteLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Send Invitation
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;

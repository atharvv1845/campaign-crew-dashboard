
import React, { useState, useEffect } from 'react';
import { CampaignFormData } from '../types/campaignTypes';
import { availableChannels } from '../constants/channels';
import { ChevronDown, UserPlus, Check, Users } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useTeamStore } from '@/hooks/useTeamStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface TeamAssignmentProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const TeamAssignment: React.FC<TeamAssignmentProps> = ({ formData, setFormData, onNext, onBack }) => {
  const { teamMembers } = useTeamStore();
  
  // Initialize teamAssignments if it doesn't exist
  useEffect(() => {
    if (!formData.teamAssignments) {
      setFormData(prev => ({
        ...prev,
        teamAssignments: {}
      }));
    }
    
    // Add team members to team array if not there already
    if (!formData.team) {
      setFormData(prev => ({
        ...prev,
        team: teamMembers.map(member => member.id)
      }));
    }
  }, [formData, setFormData, teamMembers]);

  // Assign a team member to a channel
  const assignTeamMember = (channelId: string, memberId: string) => {
    setFormData(prev => {
      const currentAssignments = prev.teamAssignments ? prev.teamAssignments[channelId] || [] : [];
      
      // Toggle the team member
      const newAssignments = currentAssignments.includes(memberId)
        ? currentAssignments.filter(id => id !== memberId)
        : [...currentAssignments, memberId];
      
      return {
        ...prev,
        teamAssignments: {
          ...(prev.teamAssignments || {}),
          [channelId]: newAssignments
        }
      };
    });
  };

  // Get assigned team members for a channel
  const getAssignedMembers = (channelId: string) => {
    return formData.teamAssignments ? formData.teamAssignments[channelId] || [] : [];
  };

  // Get assigned member names for display
  const getAssignedMemberNames = (channelId: string) => {
    const assignedIds = getAssignedMembers(channelId);
    if (assignedIds.length === 0) return 'Assign team members';
    
    const assignedMembers = teamMembers.filter(member => assignedIds.includes(member.id));
    const displayNames = assignedMembers.map(member => member.name);
    
    if (displayNames.length <= 2) return displayNames.join(', ');
    return `${displayNames[0]} +${displayNames.length - 1} more`;
  };
  
  const getWorkloadLabel = (memberId: string) => {
    const assignedChannelsCount = Object.values(formData.teamAssignments || {})
      .filter(assignments => assignments.includes(memberId)).length;
    
    if (assignedChannelsCount === 0) return 'Low';
    if (assignedChannelsCount < 3) return 'Medium';
    return 'High';
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Selected channels from previous step
  const selectedChannels = availableChannels.filter(channel => 
    formData.channels.includes(channel.id)
  );

  // Check if team members list is empty
  const noTeamMembers = teamMembers.length === 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Assign Team Members</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Assign team members to each outreach channel. You can assign multiple members to each channel.
        </p>
        
        {noTeamMembers ? (
          <div className="border rounded-lg p-6 text-center">
            <UserPlus className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Team Members Added Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You need to add team members before you can assign them to this campaign.
            </p>
            <Link to="/team">
              <Button variant="default">Add Team Members</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Channel assignment table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/20 border-b border-border">
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Channel</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Assigned Team Members</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {selectedChannels.map(channel => (
                    <tr key={channel.id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-sm font-medium">{channel.name}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button 
                              className="flex items-center justify-between w-full px-3 py-2 border border-border rounded-md text-sm hover:border-primary bg-card"
                            >
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{getAssignedMemberNames(channel.id)}</span>
                              </div>
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-56 bg-popover p-2">
                            <div className="text-sm font-medium px-2 py-1.5 text-muted-foreground">
                              Select team members:
                            </div>
                            {teamMembers.filter(m => m.status === 'Active').map(member => {
                              const isAssigned = getAssignedMembers(channel.id).includes(member.id);
                              return (
                                <DropdownMenuItem 
                                  key={member.id}
                                  onClick={() => assignTeamMember(channel.id, member.id)}
                                  className="flex items-center justify-between cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {getInitials(member.name)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                    <span className="text-xs text-muted-foreground">({getWorkloadLabel(member.id)})</span>
                                  </div>
                                  {isAssigned && (
                                    <Check className="h-4 w-4 text-primary" />
                                  )}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Team member information */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Available Team Members</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.filter(m => m.status === 'Active').map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/10">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">Workload: {getWorkloadLabel(member.id)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeamAssignment;

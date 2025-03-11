
import React, { useState } from 'react';
import { CampaignFormData } from '../types/campaignTypes';
import { availableChannels } from '../constants/channels';
import { ChevronDown, UserPlus, Check } from 'lucide-react';

interface TeamAssignmentProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

// Mock team members data
const teamMembers = [
  { id: 'user1', name: 'John Smith', avatar: '👤', workload: 'Low' },
  { id: 'user2', name: 'Sarah Lee', avatar: '👤', workload: 'Medium' },
  { id: 'user3', name: 'Alex Chen', avatar: '👤', workload: 'High' },
  { id: 'user4', name: 'Mia Johnson', avatar: '👤', workload: 'Low' },
  { id: 'user5', name: 'David Kim', avatar: '👤', workload: 'Medium' },
];

const TeamAssignment: React.FC<TeamAssignmentProps> = ({ formData, setFormData, onNext, onBack }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Toggle dropdown visibility
  const toggleDropdown = (channelId: string) => {
    setOpenDropdown(openDropdown === channelId ? null : channelId);
  };

  // Assign a team member to a channel
  const assignTeamMember = (channelId: string, memberId: string) => {
    setFormData(prev => {
      const currentAssignments = prev.teamAssignments[channelId] || [];
      
      // Toggle the team member
      const newAssignments = currentAssignments.includes(memberId)
        ? currentAssignments.filter(id => id !== memberId)
        : [...currentAssignments, memberId];
      
      return {
        ...prev,
        teamAssignments: {
          ...prev.teamAssignments,
          [channelId]: newAssignments
        }
      };
    });
  };

  // Get assigned team members for a channel
  const getAssignedMembers = (channelId: string) => {
    return formData.teamAssignments[channelId] || [];
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

  // Selected channels from previous step
  const selectedChannels = availableChannels.filter(channel => 
    formData.channels.includes(channel.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Assign Team Members</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Assign team members to each outreach channel. You can assign multiple members to each channel.
        </p>
        
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
                    <div className="relative">
                      <button 
                        className="flex items-center justify-between w-full px-3 py-2 border border-border rounded-md text-sm hover:border-primary"
                        onClick={() => toggleDropdown(channel.id)}
                      >
                        <div className="flex items-center gap-2">
                          <UserPlus className="h-4 w-4 text-muted-foreground" />
                          <span>{getAssignedMemberNames(channel.id)}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </button>
                      
                      {/* Improved dropdown menu */}
                      {openDropdown === channel.id && (
                        <div className="absolute left-0 mt-1 w-full bg-card shadow-lg rounded-lg border border-border overflow-hidden z-10">
                          <div className="p-1 max-h-[200px] overflow-y-auto">
                            {teamMembers.map(member => {
                              const isAssigned = getAssignedMembers(channel.id).includes(member.id);
                              return (
                                <button 
                                  key={member.id}
                                  onClick={() => assignTeamMember(channel.id, member.id)}
                                  className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-muted/20 rounded-md"
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{member.avatar}</span>
                                    <span>{member.name}</span>
                                    <span className="text-xs text-muted-foreground ml-1">({member.workload})</span>
                                  </div>
                                  {isAssigned && (
                                    <Check className="h-4 w-4 text-primary" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
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
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/10">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-sm">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">Workload: {member.workload}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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

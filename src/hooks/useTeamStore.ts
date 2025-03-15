
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TeamMember } from '@/components/team/types';
import { v4 as uuidv4 } from 'uuid';

interface TeamState {
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (id: string) => void;
  updateTeamMember: (member: TeamMember) => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teamMembers: [], // No mock data, only user-added team members
      addTeamMember: (member) => set((state) => {
        // Ensure member has an ID
        const memberWithId = {
          ...member,
          id: member.id || uuidv4()
        };
        return {
          teamMembers: [...state.teamMembers, memberWithId]
        };
      }),
      removeTeamMember: (id) => set((state) => ({
        teamMembers: state.teamMembers.filter(member => member.id !== id)
      })),
      updateTeamMember: (updatedMember) => set((state) => ({
        teamMembers: state.teamMembers.map(member => 
          member.id === updatedMember.id ? updatedMember : member
        )
      })),
    }),
    {
      name: 'team-storage',
    }
  )
);

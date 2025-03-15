
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TeamMember } from '@/components/team/types';

interface TeamState {
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (id: string) => void;
  updateTeamMember: (member: TeamMember) => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teamMembers: [], // Removed initial mock data
      addTeamMember: (member) => set((state) => ({
        teamMembers: [...state.teamMembers, member]
      })),
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

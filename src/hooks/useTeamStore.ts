
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TeamMember } from '@/components/team/types';

interface TeamState {
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (id: string) => void;
  updateTeamMember: (member: TeamMember) => void;
}

// Initial team members data
const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    avatar: '',
    bio: 'Sales director with 10+ years of experience in SaaS.',
    status: 'Active',
    createdAt: '2023-01-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'Sarah Lee',
    email: 'sarah.lee@example.com',
    phone: '+1 (555) 234-5678',
    role: 'Manager',
    avatar: '',
    bio: 'Sales team lead focused on enterprise clients.',
    status: 'Active',
    createdAt: '2023-02-20T10:15:00Z',
  },
  {
    id: '3',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    phone: '+1 (555) 345-6789',
    role: 'Sales Rep',
    avatar: '',
    status: 'Pending',
    createdAt: '2023-03-10T14:45:00Z',
  },
  {
    id: '4',
    name: 'Mia Johnson',
    email: 'mia.johnson@example.com',
    role: 'Sales Rep',
    avatar: '',
    status: 'Active',
    createdAt: '2023-04-05T09:20:00Z',
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'Marketing',
    avatar: '',
    status: 'Active',
    createdAt: '2023-05-12T11:30:00Z',
  },
];

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teamMembers: initialTeamMembers,
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


export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
  bio?: string;
  status: 'Active' | 'Pending' | 'Inactive';
  createdAt: string;
  hasAccess?: boolean;
}

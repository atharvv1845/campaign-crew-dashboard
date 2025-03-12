
export enum InteractionType {
  Email = 'email',
  Call = 'call',
  Meeting = 'meeting',
  Message = 'message'
}

export interface Interaction {
  id: number;
  type: InteractionType;
  content: string;
  timestamp: string;
  leadId: number;
  user?: string;
  // Added for compatibility with existing code
  date?: string;
  description?: string;
}

export interface InteractionProps {
  interaction: Interaction;
}

export interface DetailDrawerProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  campaign: Campaign;
}

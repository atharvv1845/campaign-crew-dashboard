
import { Lead, Campaign } from '../types';

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

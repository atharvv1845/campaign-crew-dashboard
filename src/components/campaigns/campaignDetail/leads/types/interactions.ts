
import { Lead, Campaign } from '../types';

export interface Interaction {
  id: number;
  type: 'email' | 'call' | 'meeting' | 'message';
  date: string;
  description: string;
  user: string;
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

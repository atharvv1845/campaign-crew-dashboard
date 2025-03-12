
export interface MessageStep {
  id: number;
  type: string;
  content: string | null;
  delay: string | null;
  assignedTo?: string;
  subject?: string;
  condition?: string;
}

export interface SavedWorkflow {
  id: number;
  name: string;
  sequence: MessageStep[];
}

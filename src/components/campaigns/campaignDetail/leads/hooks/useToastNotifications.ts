
import { useToast } from '@/hooks/use-toast';
import { Lead } from '../types';

export const useToastNotifications = () => {
  const { toast } = useToast();

  const notifyLeadUpdate = (lead: Lead) => {
    toast({
      title: "Lead Updated",
      description: `${lead.name}'s information has been updated.`,
    });
  };

  const notifyNoteUpdate = () => {
    toast({
      title: "Note saved",
      description: "The lead note has been updated.",
    });
  };

  const notifyStageUpdate = (stage: string) => {
    toast({
      title: "Stage updated",
      description: `Lead stage changed to ${stage}.`,
    });
  };

  const notifyAssignmentUpdate = (teamMember: string) => {
    toast({
      title: "Assignment changed",
      description: `Lead assigned to ${teamMember}.`,
    });
  };

  const notifyFollowUpUpdate = (date: string) => {
    toast({
      title: "Follow-up date set",
      description: `Follow-up scheduled for ${date}.`,
    });
  };

  const notifyContactLogged = () => {
    toast({
      title: "Contact logged",
      description: "Contact with this lead has been recorded.",
    });
  };

  return {
    notifyLeadUpdate,
    notifyNoteUpdate,
    notifyStageUpdate,
    notifyAssignmentUpdate,
    notifyFollowUpUpdate,
    notifyContactLogged
  };
};

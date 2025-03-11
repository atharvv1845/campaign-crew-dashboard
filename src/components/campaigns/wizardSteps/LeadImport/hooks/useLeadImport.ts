
import { useState } from 'react';
import { LeadData } from '../../../types/campaignTypes';
import { useToast } from "@/hooks/use-toast";

// Shared saved lead lists for reuse across instances
const savedLeadListsStore: { id: string; name: string; leads: LeadData[] }[] = [];

export const useLeadImport = () => {
  const { toast } = useToast();
  
  // Generate a unique ID for new leads
  const generateId = () => `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Function to save a lead list
  const saveLeadList = (listName: string, leads: LeadData[]) => {
    if (!listName) {
      toast({
        title: "Validation Error",
        description: "Please provide a name for your lead list",
        variant: "destructive"
      });
      return false;
    }
    
    if (leads.length === 0) {
      toast({
        title: "No Leads",
        description: "Cannot save an empty lead list",
        variant: "destructive"
      });
      return false;
    }
    
    // Create a new list
    const newList = {
      id: `list-${Date.now()}`,
      name: listName,
      leads: [...leads]
    };
    
    // Add to saved lists
    savedLeadListsStore.push(newList);
    
    toast({
      title: "Lead List Saved",
      description: `"${listName}" with ${leads.length} leads has been saved for future use`,
    });
    
    return true;
  };
  
  // Function to load a saved lead list
  const loadLeadList = (listId: string) => {
    const list = savedLeadListsStore.find(l => l.id === listId);
    if (list) {
      toast({
        title: "Lead List Loaded",
        description: `"${list.name}" with ${list.leads.length} leads has been loaded`,
      });
      return list.leads;
    }
    return null;
  };
  
  return {
    generateId,
    saveLeadList,
    loadLeadList,
    savedLeadLists: savedLeadListsStore,
  };
};

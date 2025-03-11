
import { useState, useEffect } from 'react';
import { LeadData } from '../../../types/campaignTypes';
import { useToast } from "@/hooks/use-toast";

// Create a global shared store for saved lead lists that persists between hook instances
type SavedLeadList = { id: string; name: string; leads: LeadData[] };
let globalSavedLeadLists: SavedLeadList[] = [];

// Try to load from localStorage if available
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('savedLeadLists');
    if (saved) {
      globalSavedLeadLists = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading saved lead lists from localStorage', e);
  }
}

export const useLeadImport = () => {
  const { toast } = useToast();
  const [savedLeadLists, setSavedLeadLists] = useState<SavedLeadList[]>(globalSavedLeadLists);
  
  // Save to localStorage whenever lists change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('savedLeadLists', JSON.stringify(savedLeadLists));
        globalSavedLeadLists = savedLeadLists;
      } catch (e) {
        console.error('Error saving lead lists to localStorage', e);
      }
    }
  }, [savedLeadLists]);
  
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
    setSavedLeadLists(prev => [...prev, newList]);
    
    toast({
      title: "Lead List Saved",
      description: `"${listName}" with ${leads.length} leads has been saved for future use`,
    });
    
    return true;
  };
  
  // Function to load a saved lead list
  const loadLeadList = (listId: string) => {
    const list = savedLeadLists.find(l => l.id === listId);
    if (list) {
      return list.leads;
    }
    return null;
  };
  
  return {
    generateId,
    saveLeadList,
    loadLeadList,
    savedLeadLists,
  };
};

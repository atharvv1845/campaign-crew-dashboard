
import React, { useState } from 'react';
import LeadTable from './leads/LeadTable';
import LeadKanban from './leads/LeadKanban';
import LeadDetailDrawer from './leads/LeadDetailDrawer';
import FilterToolbar from './leads/components/FilterToolbar';
import { useLeadFilters } from './leads/hooks/useLeadFilters';
import { Lead, Campaign } from './leads/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updateLead } from '@/lib/api/campaignApi';

interface LeadTrackingProps {
  campaign: Campaign;
  leadsData: Lead[];
  view: 'table' | 'kanban';
  setView: (view: 'table' | 'kanban') => void;
  updateCampaign?: (data: any) => void;
}

const LeadTracking: React.FC<LeadTrackingProps> = ({ 
  campaign, 
  leadsData, 
  view, 
  setView,
  updateCampaign
}) => {
  const { toast } = useToast();
  const {
    filteredLeads,
    statusFilter,
    setStatusFilter,
    teamFilter,
    setTeamFilter,
    dateSort,
    setDateSort,
    selectedLeads,
    handleSelectLead,
    resetFilters
  } = useLeadFilters(leadsData);
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(leadsData);

  // Handle lead click to show details
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
  };

  // Handle updating a lead
  const handleUpdateLead = async (updatedLead: Lead) => {
    try {
      // Update lead through API
      if (campaign.id && updatedLead.id) {
        await updateLead(campaign.id, updatedLead.id, updatedLead);
        
        // Update the lead in the local state
        const updatedLeads = leads.map(lead => 
          lead.id === updatedLead.id ? updatedLead : lead
        );
        setLeads(updatedLeads);
        
        // Close the detail drawer
        setShowLeadDetail(false);
        
        // Show success toast
        toast({
          title: "Lead Updated",
          description: `${updatedLead.name}'s information has been updated.`
        });
        
        // In a real app, you would update the campaign data too
        if (updateCampaign) {
          // This is a simplified example - in a real app you would update the actual lead data
          updateCampaign({
            // Update any campaign stats that might change based on lead status
          });
        }
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: `Error: ${(error as Error).message}`,
        variant: "destructive"
      });
    }
  };

  // Handle lead status change
  const handleLeadStatusChange = (leadId: string | number, status: string) => {
    handleUpdateLead({
      ...leads.find(lead => lead.id === leadId)!,
      status,
      currentStage: status
    });
  };

  // Handle bulk actions for selected leads
  const handleBulkAction = (action: 'status' | 'team' | 'followUp', value: string) => {
    // Update leads based on the action
    const updatedLeads = leads.map(lead => {
      if (selectedLeads.includes(lead.id as number | string)) {
        if (action === 'status') {
          return { ...lead, currentStage: value, status: value };
        } else if (action === 'team') {
          return { ...lead, assignedTo: value };
        } else if (action === 'followUp') {
          return { ...lead, nextFollowUpDate: value };
        }
      }
      return lead;
    });
    
    setLeads(updatedLeads);
    
    // Reset selection
    selectedLeads.forEach(id => handleSelectLead(id, false));
    
    // Show success toast
    toast({
      title: "Leads Updated",
      description: `${selectedLeads.length} leads have been updated.`
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Use the table below to track and manage your leads. Click on a lead to view details or update their information.
          </p>
          
          {/* Filter Toolbar */}
          <FilterToolbar 
            view={view}
            setView={setView}
            campaign={campaign}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            teamFilter={teamFilter}
            setTeamFilter={setTeamFilter}
            dateSort={dateSort}
            setDateSort={setDateSort}
            resetFilters={resetFilters}
            selectedLeads={selectedLeads}
            handleBulkAction={handleBulkAction}
          />
          
          {/* Table view */}
          {view === 'table' && (
            <LeadTable 
              leads={filteredLeads} 
              onLeadClick={handleLeadClick}
              onStatusChange={handleLeadStatusChange}
              onSelectLead={handleSelectLead}
              selectedLeads={selectedLeads}
              campaign={campaign}
              onUpdateLead={handleUpdateLead}
            />
          )}
          
          {/* Kanban view */}
          {view === 'kanban' && (
            <LeadKanban 
              stages={campaign.stages || []} 
              leads={filteredLeads} 
              campaignLeads={campaign.leads}
              onLeadClick={handleLeadClick} 
            />
          )}
        </CardContent>
      </Card>
      
      {/* Lead Detail Drawer */}
      {selectedLead && (
        <LeadDetailDrawer
          lead={selectedLead}
          open={showLeadDetail}
          onClose={() => setShowLeadDetail(false)}
          campaign={campaign}
          onUpdateLead={handleUpdateLead}
        />
      )}
    </div>
  );
};

export default LeadTracking;

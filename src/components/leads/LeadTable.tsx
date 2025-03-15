
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import LeadFilters from './LeadFilters';
import LeadTableComponent from './LeadTableComponent';
import { Lead } from './LeadTableComponent';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import { fetchAllCampaigns, fetchAllLeads, updateLeadGlobal } from '@/lib/api/campaignApi';
import LeadDetailDrawer from './LeadDetailDrawer';

const LeadTable: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [campaignFilter, setCampaignFilter] = useState('All Campaigns');
  const [teamFilter, setTeamFilter] = useState('All Team Members');
  const [dateSort, setDateSort] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [campaignOptions, setCampaignOptions] = useState<{id: string | number, name: string}[]>([]);
  
  const itemsPerPage = 10;

  // Fetch all leads
  const { data: leadsData, isLoading: isLoadingLeads, error: leadsError } = useQuery({
    queryKey: ['allLeads'],
    queryFn: fetchAllLeads
  });

  // Fetch all campaigns for filtering
  const { data: campaigns, isLoading: isLoadingCampaigns, error: campaignsError } = useQuery({
    queryKey: ['allCampaigns'],
    queryFn: fetchAllCampaigns
  });

  const isLoading = isLoadingLeads || isLoadingCampaigns;
  const error = leadsError || campaignsError;

  // Process campaigns and leads data
  useEffect(() => {
    if (campaigns && Array.isArray(campaigns)) {
      // Extract campaign options for filtering
      const allCampaignOptions: {id: string | number, name: string}[] = campaigns.map(campaign => ({
        id: campaign.id,
        name: campaign.name
      }));
      
      setCampaignOptions(allCampaignOptions);
      
      // Extract team members from all campaigns
      const allTeamMembers = new Set<string>();
      campaigns.forEach(campaign => {
        if (campaign.teamMembers && Array.isArray(campaign.teamMembers)) {
          campaign.teamMembers.forEach(member => allTeamMembers.add(member));
        }
      });
      
      setTeamMembers(Array.from(allTeamMembers));
    }
  }, [campaigns]);

  // Process leads when data is loaded
  useEffect(() => {
    if (leadsData && Array.isArray(leadsData)) {
      setAllLeads(leadsData);
      
      // Extract all status options from leads
      const allStatuses = new Set<string>();
      leadsData.forEach(lead => {
        if (lead.status) allStatuses.add(lead.status);
        if (lead.currentStage) allStatuses.add(lead.currentStage);
      });
      
      setStatusOptions(Array.from(allStatuses));
    }
  }, [leadsData]);

  // Filter leads based on all filters
  const filteredLeads = allLeads.filter(lead => {
    // Apply search filter
    const matchesSearch = 
      (lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'All Statuses' || 
      lead.status === statusFilter || 
      lead.currentStage === statusFilter;
    
    // Apply campaign filter
    const matchesCampaign = campaignFilter === 'All Campaigns' || 
      lead.campaign === campaignFilter;
    
    // Apply team filter
    const matchesTeam = teamFilter === 'All Team Members' || 
      lead.assignedTo === teamFilter || 
      lead.assignedTeamMember === teamFilter;
    
    // Return true if all conditions are met
    return matchesSearch && matchesStatus && matchesCampaign && matchesTeam;
  });
  
  // Sort leads based on date
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (dateSort === 'next-follow-up-asc') {
      return new Date(a.nextFollowUpDate || '').getTime() - new Date(b.nextFollowUpDate || '').getTime();
    } else if (dateSort === 'next-follow-up-desc') {
      return new Date(b.nextFollowUpDate || '').getTime() - new Date(a.nextFollowUpDate || '').getTime();
    } else if (dateSort === 'last-contact-asc') {
      return new Date(a.lastContact || '').getTime() - new Date(b.lastContact || '').getTime();
    } else if (dateSort === 'last-contact-desc') {
      return new Date(b.lastContact || '').getTime() - new Date(a.lastContact || '').getTime();
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle lead click
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailDrawer(true);
  };

  // Handle lead update
  const handleUpdateLead = async (updatedLead: Lead) => {
    try {
      // Update the lead in the database/API
      if (updatedLead.campaignId) {
        await updateLeadGlobal(updatedLead.id, updatedLead);
        
        // Update the lead in the local state
        const updatedLeads = allLeads.map(lead => 
          lead.id === updatedLead.id ? updatedLead : lead
        );
        setAllLeads(updatedLeads);
        
        // Close the detail drawer
        setShowDetailDrawer(false);
        
        // Show success toast
        toast({
          title: "Lead Updated",
          description: `${updatedLead.name}'s information has been updated.`
        });
      } else {
        toast({
          title: "Update Failed",
          description: "Lead update failed: Missing campaign ID",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: `Error: ${(error as Error).message}`,
        variant: "destructive"
      });
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Statuses');
    setCampaignFilter('All Campaigns');
    setTeamFilter('All Team Members');
    setDateSort('none');
  };

  return (
    <div className="space-y-6">
      {/* Header and filters */}
      <LeadFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        campaignFilter={campaignFilter}
        setCampaignFilter={setCampaignFilter}
        teamFilter={teamFilter}
        setTeamFilter={setTeamFilter}
        dateSort={dateSort}
        setDateSort={setDateSort}
        statusOptions={['All Statuses', ...statusOptions]}
        campaignOptions={[{id: 'all', name: 'All Campaigns'}, ...campaignOptions]}
        teamMembers={['All Team Members', ...teamMembers]}
        resetFilters={resetFilters}
      />
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : error ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Error Loading Leads</h3>
          <p className="text-muted-foreground">There was a problem loading your leads. Please try again.</p>
        </div>
      ) : paginatedLeads.length === 0 ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No Leads Available</h3>
          <p className="text-muted-foreground">
            {filteredLeads.length === 0 && allLeads.length > 0
              ? "No leads match your current filters. Try adjusting your search criteria."
              : "Add leads from campaign creation or import leads to get started."}
          </p>
        </div>
      ) : (
        <>
          {/* Leads Table */}
          <LeadTableComponent
            leads={paginatedLeads}
            onLeadClick={handleLeadClick}
            statusOptions={statusOptions}
            teamMembers={teamMembers}
            onUpdateLead={handleUpdateLead}
          />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  // For simplicity, show max 5 page numbers
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = Math.min(currentPage - 2 + i, totalPages);
                  }
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNum)}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      
      {/* Lead Detail Drawer */}
      {selectedLead && (
        <LeadDetailDrawer
          lead={selectedLead}
          open={showDetailDrawer}
          onClose={() => setShowDetailDrawer(false)}
          statusOptions={statusOptions}
          teamMembers={teamMembers}
          onUpdateLead={handleUpdateLead}
        />
      )}
    </div>
  );
};

export default LeadTable;


import React from 'react';
import { BarChart, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CampaignTable from './CampaignTable';
import CampaignSearchFilters from './CampaignSearchFilters';
import { CampaignData } from './campaignData';

interface CampaignTabsContentProps {
  activeTab: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredCampaigns: CampaignData[];
  refreshCampaigns: () => void;
  onCreateCampaign: () => void;
  handleCampaignClick: (campaignId: number) => void;
  campaigns: CampaignData[];
}

const CampaignTabsContent: React.FC<CampaignTabsContentProps> = ({
  activeTab,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filteredCampaigns,
  refreshCampaigns,
  onCreateCampaign,
  handleCampaignClick,
  campaigns
}) => {
  if (activeTab === "campaigns") {
    return (
      <div className="flex-1 flex flex-col space-y-4 mt-4">
        <CampaignSearchFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <div className="flex-1 overflow-hidden cursor-pointer">
          <div className="h-full overflow-y-auto pb-4">
            <CampaignTable 
              campaigns={filteredCampaigns}
              refreshList={refreshCampaigns} 
              onCampaignClick={handleCampaignClick}
            />
          </div>
        </div>
      </div>
    );
  } else if (activeTab === "reporting") {
    return (
      <div className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <BarChart className="h-12 w-12 text-muted-foreground opacity-40" />
                <h3 className="mt-4 text-lg font-medium">No Campaign Data</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Create your first campaign to begin tracking and visualizing your outreach performance metrics.
                </p>
                <Button 
                  onClick={onCreateCampaign}
                  className="mt-6"
                  variant="outline"
                >
                  Create First Campaign
                </Button>
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Campaign performance charts will appear here when you have active campaigns with data.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } else if (activeTab === "leads") {
    return (
      <div className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground opacity-40" />
              <h3 className="mt-4 text-lg font-medium">Unified Lead View</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                View and manage all leads across all campaigns in one place. Import your leads to get started.
              </p>
              <Button 
                onClick={onCreateCampaign}
                className="mt-6"
                variant="outline"
              >
                Import Leads
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return null;
};

export default CampaignTabsContent;

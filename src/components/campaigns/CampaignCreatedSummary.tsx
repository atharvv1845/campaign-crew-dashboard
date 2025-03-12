
import React, { useState } from 'react';
import { X, ListChecks, UserCheck, BarChart } from 'lucide-react';
import { CampaignFormData, LeadData } from './types/campaignTypes';
import LeadManagement from './wizardSteps/LeadImport/components/LeadManagement';
import { useToast } from '@/hooks/use-toast';

interface CampaignCreatedSummaryProps {
  campaign: CampaignFormData;
  onClose: () => void;
  onLeadUpdate: (id: string, updates: Partial<LeadData>) => void;
}

const CampaignCreatedSummary: React.FC<CampaignCreatedSummaryProps> = ({
  campaign,
  onClose,
  onLeadUpdate
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('leads');

  const handleBulkAssign = () => {
    // In a real app, this would open a dialog to assign all leads
    toast({
      title: "Bulk Assignment",
      description: "This would open a dialog to assign all leads to team members."
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-card w-full max-w-4xl max-h-[90vh] rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Campaign Created Successfully</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-muted/10 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">{campaign.name}</h3>
          <p className="text-muted-foreground">{campaign.description}</p>
          <div className="flex items-center mt-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Leads:</span> {campaign.leads.length}
            </div>
            <div>
              <span className="font-medium">Channels:</span> {campaign.channels.join(', ')}
            </div>
            <div>
              <span className="font-medium">Team:</span> {campaign.team.length > 0 ? campaign.team.join(', ') : 'None assigned'}
            </div>
          </div>
        </div>

        <div className="flex border-b border-border mb-4">
          <button
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'leads' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('leads')}
          >
            <ListChecks className="h-4 w-4" />
            Manage Leads
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'team' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('team')}
          >
            <UserCheck className="h-4 w-4" />
            Team Assignment
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'stats' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart className="h-4 w-4" />
            Campaign Stats
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-300px)]">
          {activeTab === 'leads' && (
            <div>
              {campaign.leads.length > 0 ? (
                <LeadManagement 
                  leads={campaign.leads}
                  onLeadUpdate={onLeadUpdate}
                  stages={campaign.stages}
                  teamMembers={campaign.team}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No leads have been added to this campaign.
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="p-4">
              <h3 className="text-md font-medium mb-4">Team Assignment</h3>
              {campaign.team.length > 0 ? (
                <div className="space-y-2">
                  <button
                    onClick={handleBulkAssign}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
                  >
                    Bulk Assign Leads
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {campaign.team.map(member => (
                      <div key={member} className="p-3 border border-border rounded-md">
                        <div className="font-medium">{member}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Assigned leads: 0
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No team members have been assigned to this campaign.
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="p-4 text-center">
              <h3 className="text-md font-medium mb-4">Campaign Statistics</h3>
              <p className="text-muted-foreground">
                Campaign statistics will be available once the campaign is active and has leads being processed.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Go to Campaign List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCreatedSummary;

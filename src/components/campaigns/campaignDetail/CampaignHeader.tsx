
import React from 'react';
import { ArrowLeft, Users, Plus } from 'lucide-react';

interface CampaignHeaderProps {
  campaign: {
    name: string;
    status: string;
    createdAt: string;
  };
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => window.history.back()}
          className="p-1 rounded-md hover:bg-muted/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <p className="text-sm text-muted-foreground">
            Created on {campaign.createdAt} • {campaign.status}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
          <Users className="h-4 w-4" />
          <span>Manage Team</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Leads</span>
        </button>
      </div>
    </div>
  );
};

export default CampaignHeader;

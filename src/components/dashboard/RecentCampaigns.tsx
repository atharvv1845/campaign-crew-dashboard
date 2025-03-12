
import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentCampaigns: React.FC = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/campaigns');
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns');
  };

  return (
    <div className="glass-card rounded-xl">
      <div className="p-6 flex justify-between items-center border-b border-border">
        <h3 className="text-lg font-medium">Recent Campaigns</h3>
        <button 
          className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          onClick={handleViewAll}
        >
          View All <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <FileText className="h-10 w-10 text-muted-foreground opacity-40" />
        <p className="mt-4 text-sm text-muted-foreground">No campaigns yet</p>
        <p className="mt-2 text-xs text-muted-foreground">Create your first campaign to get started</p>
      </div>
      
      <div className="p-5 border-t border-border bg-muted/10 flex justify-center">
        <button 
          className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
          onClick={handleCreateCampaign}
        >
          Create New Campaign <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RecentCampaigns;

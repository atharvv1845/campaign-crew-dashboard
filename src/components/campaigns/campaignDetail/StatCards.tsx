
import React from 'react';
import { Users, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

interface StatCardsProps {
  campaign: {
    leads: number;
    contacted: number;
    responses: number;
    positive: number;
    negative: number;
  };
  leadsData: Array<{
    id: number;
    currentStage: string;
    [key: string]: any;
  }>;
}

const StatCards: React.FC<StatCardsProps> = ({ campaign, leadsData }) => {
  // Get actual count of leads
  const totalLeads = leadsData.length;
  
  // Count contacted leads (those not in "New Lead" or initial stage)
  const contactedLeads = leadsData.filter(lead => 
    lead.currentStage !== 'New Lead' && 
    lead.currentStage !== 'Not Contacted'
  ).length;
  
  // Count responses (leads that have replied)
  const responseLeads = leadsData.filter(lead => 
    lead.currentStage === 'Replied' || 
    lead.currentStage === 'Interested' || 
    lead.currentStage === 'Meeting' || 
    lead.currentStage === 'Qualified' || 
    lead.currentStage === 'Positive' || 
    lead.currentStage === 'Negative'
  ).length;
  
  // Count positive responses
  const positiveLeads = leadsData.filter(lead => 
    lead.currentStage === 'Interested' || 
    lead.currentStage === 'Meeting' || 
    lead.currentStage === 'Qualified' || 
    lead.currentStage === 'Positive'
  ).length;
  
  // Count negative responses
  const negativeLeads = leadsData.filter(lead => 
    lead.currentStage === 'Negative'
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
            <p className="text-2xl font-bold">{totalLeads}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${totalLeads > 0 ? (contactedLeads / totalLeads) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {contactedLeads} contacted ({totalLeads > 0 ? Math.round((contactedLeads / totalLeads) * 100) : 0}%)
          </p>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Responses</p>
            <p className="text-2xl font-bold">{responseLeads}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${contactedLeads > 0 ? (responseLeads / contactedLeads) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {contactedLeads > 0 ? Math.round((responseLeads / contactedLeads) * 100) : 0}% response rate
          </p>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Positive</p>
            <p className="text-2xl font-bold">{positiveLeads}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500"
              style={{ width: `${responseLeads > 0 ? (positiveLeads / responseLeads) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {responseLeads > 0 ? Math.round((positiveLeads / responseLeads) * 100) : 0}% of responses
          </p>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Negative</p>
            <p className="text-2xl font-bold">{negativeLeads}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500"
              style={{ width: `${responseLeads > 0 ? (negativeLeads / responseLeads) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {responseLeads > 0 ? Math.round((negativeLeads / responseLeads) * 100) : 0}% of responses
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCards;

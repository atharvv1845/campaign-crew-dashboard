
import React from 'react';
import { Clock } from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  count: number;
}

interface Lead {
  id: number;
  name: string;
  company: string;
  lastContacted: string;
  currentStage: string;
  assignedTo: string;
}

interface LeadKanbanProps {
  stages: Stage[];
  leads: Lead[];
  campaignLeads: number;
}

const LeadKanban: React.FC<LeadKanbanProps> = ({ stages, leads, campaignLeads }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
      {stages.map(stage => (
        <div key={stage.id} className="min-w-[250px] glass-card rounded-xl overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{stage.name}</h3>
              <span className="text-xs bg-muted/20 px-2 py-0.5 rounded-full">
                {stage.count}
              </span>
            </div>
          </div>
          
          <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
            {/* Filter leads by stage and map them here */}
            {leads
              .filter(lead => lead.currentStage === stage.name)
              .map(lead => (
                <div 
                  key={lead.id}
                  className="p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium">{lead.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{lead.company}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{lead.assignedTo}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">{lead.lastContacted}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadKanban;

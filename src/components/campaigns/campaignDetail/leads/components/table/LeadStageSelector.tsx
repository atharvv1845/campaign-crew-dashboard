
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StageBadge from '../../../badges/StageBadge';
import { Campaign } from '../../types';

interface LeadStageSelectorProps {
  currentStage: string;
  onStageChange: (stage: string) => void;
  campaign?: Campaign;
}

const LeadStageSelector: React.FC<LeadStageSelectorProps> = ({ 
  currentStage, 
  onStageChange, 
  campaign 
}) => {
  const stages = campaign?.stages?.map(stage => stage.name) || [
    'Not Contacted',
    'Contacted',
    'Replied',
    'Follow-Up Needed',
    'Positive',
    'Negative'
  ];

  return (
    <Select defaultValue={currentStage} onValueChange={onStageChange}>
      <SelectTrigger className="w-[160px] h-8 border-none bg-transparent p-0">
        <SelectValue>
          <StageBadge stage={currentStage} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {stages.map(stage => (
          <SelectItem key={stage} value={stage}>
            <div className="flex items-center gap-2">
              <StageBadge stage={stage} />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LeadStageSelector;


import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConditionStepData, StageData } from '../../types/campaignTypes';

interface ConditionFormProps {
  data: ConditionStepData;
  onChange: (data: ConditionStepData) => void;
  stages?: StageData[]; // Add stages prop
}

const ConditionForm: React.FC<ConditionFormProps> = ({ data, onChange, stages = [] }) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Condition</Label>
        <Select
          value={data.condition}
          onValueChange={(value) => onChange({ ...data, condition: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="if-no-reply">If no reply</SelectItem>
            <SelectItem value="if-opened">If email was opened</SelectItem>
            <SelectItem value="if-clicked">If link was clicked</SelectItem>
            <SelectItem value="if-replied">If replied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Action</Label>
        <Select
          value={data.action}
          onValueChange={(value) => onChange({ ...data, action: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="move-to-stage">Move to another stage</SelectItem>
            <SelectItem value="wait-and-retry">Wait and retry</SelectItem>
            <SelectItem value="end-sequence">End sequence</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data.action === 'move-to-stage' && (
        <div className="space-y-2">
          <Label>Target Stage</Label>
          <Select
            value={data.targetStage}
            onValueChange={(value) => onChange({ ...data, targetStage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.length > 0 ? (
                stages.map(stage => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>No stages available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      {data.action === 'wait-and-retry' && (
        <div className="space-y-2">
          <Label>Wait Days</Label>
          <Input
            type="number"
            min="1"
            value={data.waitDays || 1}
            onChange={(e) => onChange({ ...data, waitDays: parseInt(e.target.value) })}
          />
        </div>
      )}
    </>
  );
};

export default ConditionForm;


import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableChannels } from '../../constants/channels';
import { MessageStepData } from '../../types/campaignTypes';

interface MessageFormProps {
  data: MessageStepData;
  onChange: (data: MessageStepData) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ data, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Channel</Label>
          <Select 
            defaultValue={data.channel || "email"}
            onValueChange={(value) => onChange({ ...data, channel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              {availableChannels.map((channel) => (
                <SelectItem key={channel.id} value={channel.id}>
                  {channel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Assigned To</Label>
          <Select 
            value={data.assignedTo} 
            onValueChange={(value) => onChange({ ...data, assignedTo: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John Smith</SelectItem>
              <SelectItem value="sarah">Sarah Lee</SelectItem>
              <SelectItem value="mike">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Subject (for email)</Label>
        <Input
          value={data.subject || ''}
          onChange={(e) => onChange({ ...data, subject: e.target.value })}
          placeholder="Email subject line"
        />
      </div>

      <div className="space-y-2">
        <Label>Message</Label>
        <Textarea
          value={data.message}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder="Enter your message..."
          rows={6}
        />
        <div className="text-xs text-muted-foreground">
          Use {"{{firstName}}"}, {"{{company}}"}, etc. for personalization.
        </div>
      </div>
    </>
  );
};

export default MessageForm;

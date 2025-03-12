
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
          <Label>Label</Label>
          <Input
            value={data.label || ''}
            onChange={(e) => onChange({ ...data, label: e.target.value })}
            placeholder="Message name or label"
          />
        </div>
        <div className="space-y-2">
          <Label>Channel</Label>
          <Select 
            value={data.channel || "email"}
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
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Assigned To</Label>
          <Select 
            value={data.assignedTo || ''} 
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
        <div className="space-y-2">
          <Label>Template</Label>
          <Select 
            value={data.templateId || ''} 
            onValueChange={(value) => onChange({ ...data, templateId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template1">Product Introduction</SelectItem>
              <SelectItem value="template2">Follow Up</SelectItem>
              <SelectItem value="template3">Meeting Request</SelectItem>
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
        <Label>Message <span className="text-red-500">*</span></Label>
        <Textarea
          value={data.message || ''}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder="Enter your message..."
          rows={6}
          required
        />
        <div className="text-xs text-muted-foreground">
          Use {"{{firstName}}"}, {"{{company}}"}, etc. for personalization.
        </div>
      </div>
    </>
  );
};

export default MessageForm;

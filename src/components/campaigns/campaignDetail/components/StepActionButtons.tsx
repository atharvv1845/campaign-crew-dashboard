
import React from 'react';
import { Clock, Mail, MessageSquare, Linkedin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepActionButtonsProps {
  onAddStep: (type: string) => void;
}

const StepActionButtons: React.FC<StepActionButtonsProps> = ({ onAddStep }) => {
  const channelOptions = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'call', label: 'Call', icon: Phone },
    { value: 'sms', label: 'SMS', icon: MessageSquare },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-wrap gap-2 pt-4">
      <div className="text-sm text-muted-foreground mr-2 flex items-center">Add step:</div>
      {channelOptions.map(channel => {
        const Icon = channel.icon;
        return (
          <Button 
            key={channel.value}
            variant="outline"
            size="sm"
            onClick={() => onAddStep(channel.value)}
          >
            <Icon className="h-4 w-4" />
            <span className="ml-2">{channel.label}</span>
          </Button>
        );
      })}
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onAddStep('delay')}
      >
        <Clock className="h-4 w-4" />
        <span className="ml-2">Delay</span>
      </Button>
    </div>
  );
};

export default StepActionButtons;

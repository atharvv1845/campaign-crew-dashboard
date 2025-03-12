
import React from 'react';
import { Mail, Linkedin, MessageSquare, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddStepButtonsProps {
  onAddStep: (type: string) => void;
}

const AddStepButtons: React.FC<AddStepButtonsProps> = ({ onAddStep }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="text-sm text-muted-foreground flex items-center mr-2">Add step:</div>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onAddStep('email')}
      >
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onAddStep('linkedin')}
      >
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onAddStep('whatsapp')}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onAddStep('sms')}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        SMS
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onAddStep('call')}
      >
        <Phone className="h-4 w-4 mr-2" />
        Call
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onAddStep('delay')}
      >
        <Clock className="h-4 w-4 mr-2" />
        Delay
      </Button>
    </div>
  );
};

export default AddStepButtons;

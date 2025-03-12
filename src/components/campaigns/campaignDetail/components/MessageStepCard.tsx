
import React from 'react';
import { Edit, XCircle, Clock, Mail, MessageSquare, Linkedin, Phone, GripHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MessageStepCardProps {
  step: {
    id: number;
    type: string;
    content: string | null;
    delay: string | null;
  };
  index: number;
  totalSteps: number;
  onEdit: (step: any) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, direction: 'up' | 'down') => void;
}

const MessageStepCard: React.FC<MessageStepCardProps> = ({
  step,
  index,
  totalSteps,
  onEdit,
  onDelete,
  onMove,
}) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-indigo-500" />;
      case 'call':
        return <Phone className="h-5 w-5 text-green-500" />;
      case 'sms':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'delay':
        return <Clock className="h-5 w-5 text-gray-500" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <Card key={step.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-5 gap-4 p-3 items-center">
          <div className="flex items-center gap-2">
            <GripHorizontal className="h-4 w-4 cursor-move text-muted-foreground" />
            <div className="flex items-center justify-center h-8 w-8 rounded-full border">
              {getStepIcon(step.type)}
            </div>
          </div>
          
          <div>
            {step.type === 'delay' ? (
              <div className="text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Wait</span>
              </div>
            ) : (
              <div className="capitalize">{step.type}</div>
            )}
          </div>
          
          <div className="col-span-2">
            {step.type === 'delay' ? (
              <div className="font-medium">{step.delay}</div>
            ) : (
              <div className="truncate text-sm">{step.content}</div>
            )}
          </div>
          
          <div className="flex items-center gap-2 justify-end">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onMove(step.id, 'up')}
              disabled={index === 0}
            >
              ↑
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onMove(step.id, 'down')}
              disabled={index === totalSteps - 1}
            >
              ↓
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(step)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(step.id)}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageStepCard;

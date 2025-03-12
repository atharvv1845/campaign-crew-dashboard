
import React from 'react';
import { 
  Mail, 
  MessageSquare, 
  Linkedin, 
  Phone, 
  ArrowRight, 
  Clock, 
  Edit, 
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

const MessageSequence: React.FC = () => {
  const { toast } = useToast();
  
  // Mock message sequence data
  const sequence = [
    {
      id: 1,
      type: 'email',
      content: 'Initial outreach email introducing our product',
      delay: null,
    },
    {
      id: 2,
      type: 'delay',
      content: null,
      delay: '3 days',
    },
    {
      id: 3,
      type: 'email',
      content: 'Follow-up email if no response',
      delay: null,
    },
    {
      id: 4,
      type: 'delay',
      content: null,
      delay: '4 days',
    },
    {
      id: 5,
      type: 'linkedin',
      content: 'LinkedIn connection request with personalized message',
      delay: null,
    },
    {
      id: 6,
      type: 'delay',
      content: null,
      delay: '5 days',
    },
    {
      id: 7,
      type: 'call',
      content: 'Call to discuss potential fit',
      delay: null,
    },
  ];
  
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Message Sequence</h2>
        <Button 
          onClick={() => {
            toast({
              title: "Edit sequence",
              description: "Opening message sequence editor.",
            });
          }}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Sequence
        </Button>
      </div>
      
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted-foreground/20" />
        
        <div className="space-y-6">
          {sequence.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="flex items-start">
                <div className={`
                  rounded-full p-2 z-10 
                  ${step.type === 'delay' ? 'bg-muted/20' : 'bg-card'} 
                  border border-border
                `}>
                  {getStepIcon(step.type)}
                </div>
                
                <div className="ml-4 flex-1">
                  {step.type === 'delay' ? (
                    <Card className="bg-muted/10 border-dashed">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Wait for {step.delay}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {getStepIcon(step.type)}
                            <span className="ml-2 font-medium capitalize">{step.type}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.content}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
              
              {index < sequence.length - 1 && step.type !== 'delay' && sequence[index + 1].type !== 'delay' && (
                <div className="absolute left-6 top-12 flex justify-center items-center">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          
          <div className="relative">
            <Button 
              variant="ghost" 
              className="ml-12"
              onClick={() => {
                toast({
                  title: "Add step",
                  description: "Opening step creation dialog.",
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSequence;


import React from 'react';
import { Plus, Copy, Edit, Trash, Check, Clock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock template data
const templates = [
  {
    id: 1,
    name: 'Initial Outreach',
    subject: 'Introducing our new solution for [company]',
    preview: 'Hi [name], I hope this email finds you well. I wanted to reach out because I noticed...',
    usageCount: 1432,
    responseRate: 32,
    lastUsed: '2 days ago',
  },
  {
    id: 2,
    name: 'Follow-up #1',
    subject: 'Following up on my previous email',
    preview: 'Hi [name], I just wanted to follow up on my previous email to see if you had a chance...',
    usageCount: 1056,
    responseRate: 24,
    lastUsed: '1 day ago',
  },
  {
    id: 3,
    name: 'Demo Request',
    subject: 'Quick demo of [product] for [company]?',
    preview: "Hi [name], I'd like to offer you a personalized demo of our solution that has helped...",
    usageCount: 873,
    responseRate: 41,
    lastUsed: '3 days ago',
  },
  {
    id: 4,
    name: 'Case Study Share',
    subject: 'How [similar company] achieved [result]',
    preview: 'Hi [name], I thought you might be interested in this case study of how we helped...',
    usageCount: 632,
    responseRate: 37,
    lastUsed: '5 days ago',
  },
];

const MessageTemplates: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header and actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Message Templates</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </button>
      </div>
      
      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="glass-card rounded-xl hover-effect">
            <div className="p-5 border-b border-border">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-base">{template.name}</h4>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm font-medium mt-2">{template.subject}</p>
            </div>
            
            <div className="p-5 border-b border-border">
              <p className="text-sm text-muted-foreground line-clamp-3">{template.preview}</p>
            </div>
            
            <div className="p-5 grid grid-cols-3 gap-2 bg-muted/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                  <Mail className="h-3 w-3" />
                  <span>Sent</span>
                </div>
                <p className="text-sm font-medium">{template.usageCount.toLocaleString()}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                  <Check className="h-3 w-3" />
                  <span>Response</span>
                </div>
                <p className="text-sm font-medium">{template.responseRate}%</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  <span>Last Used</span>
                </div>
                <p className="text-sm font-medium">{template.lastUsed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageTemplates;

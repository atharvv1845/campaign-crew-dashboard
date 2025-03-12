
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EmailFormProps {
  subject: string;
  content: string;
  onSubjectChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({
  subject,
  content,
  onSubjectChange,
  onContentChange
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Subject Line</Label>
        <Input 
          value={subject || ''}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Enter subject line"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Message Content</Label>
        <Textarea 
          value={content || ''}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Enter your message..."
          rows={5}
        />
        <p className="text-xs text-muted-foreground">
          Use [name], [company], etc. for personalization.
        </p>
      </div>
    </>
  );
};

export default EmailForm;


import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MessageFormProps {
  content: string;
  onContentChange: (value: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({
  content,
  onContentChange
}) => {
  return (
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
  );
};

export default MessageForm;


import React from 'react';
import ChannelSelector from './ChannelSelector';
import TeamAssignment from './TeamAssignment';
import EmailForm from './EmailForm';
import MessageForm from './MessageForm';
import ConditionSelector from './ConditionSelector';
import { MessageStep } from '../../hooks/useMessageSequence';

interface MessageStepFormProps {
  data: MessageStep;
  onChange: (updatedData: MessageStep) => void;
}

const MessageStepForm: React.FC<MessageStepFormProps> = ({
  data,
  onChange
}) => {
  const channelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'call', label: 'Call' },
    { value: 'sms', label: 'SMS' },
    { value: 'whatsapp', label: 'WhatsApp' },
  ];
  
  const teamOptions = [
    { value: 'john', label: 'John Smith' },
    { value: 'sarah', label: 'Sarah Lee' },
    { value: 'alex', label: 'Alex Chen' },
    { value: 'mia', label: 'Mia Johnson' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <ChannelSelector 
          value={data.type}
          onChange={(value) => onChange({...data, type: value})}
          options={channelOptions}
        />
        <TeamAssignment
          value={data.assignedTo || ''}
          onChange={(value) => onChange({...data, assignedTo: value})}
          options={teamOptions}
        />
      </div>
      
      {data.type === 'email' ? (
        <EmailForm
          subject={data.subject || ''}
          content={data.content || ''}
          onSubjectChange={(value) => onChange({...data, subject: value})}
          onContentChange={(value) => onChange({...data, content: value})}
        />
      ) : (
        <MessageForm
          content={data.content || ''}
          onContentChange={(value) => onChange({...data, content: value})}
        />
      )}
      
      <ConditionSelector
        value={data.condition || ''}
        onChange={(value) => onChange({...data, condition: value})}
      />
    </div>
  );
};

export default MessageStepForm;

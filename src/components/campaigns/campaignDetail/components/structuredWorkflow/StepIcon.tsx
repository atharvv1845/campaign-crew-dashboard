
import React from 'react';
import { Mail, Linkedin, Phone, MessageSquare, Clock } from 'lucide-react';

interface StepIconProps {
  type: string;
  className?: string;
}

const StepIcon: React.FC<StepIconProps> = ({ type, className = "h-5 w-5" }) => {
  switch(type) {
    case 'email':
      return <Mail className={`${className} text-blue-500`} />;
    case 'linkedin':
      return <Linkedin className={`${className} text-indigo-500`} />;
    case 'call':
      return <Phone className={`${className} text-green-500`} />;
    case 'sms':
      return <MessageSquare className={`${className} text-purple-500`} />;
    case 'whatsapp':
      return <MessageSquare className={`${className} text-green-500`} />;
    case 'delay':
      return <Clock className={`${className} text-gray-500`} />;
    default:
      return <Mail className={className} />;
  }
};

export default StepIcon;

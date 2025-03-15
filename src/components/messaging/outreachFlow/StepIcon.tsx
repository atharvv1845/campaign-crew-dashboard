
import React from 'react';
import { Mail, Linkedin, MessageSquare, Phone, AlertCircle, Clock } from 'lucide-react';

interface StepIconProps {
  type: string;
  platform?: string;
}

const StepIcon: React.FC<StepIconProps> = ({ type, platform }) => {
  if (type === 'message') {
    switch (platform?.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-600" />;
      case 'email':
        return <Mail className="h-4 w-4 text-purple-600" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'call':
        return <Phone className="h-4 w-4 text-orange-600" />;
      default:
        return <Mail className="h-4 w-4 text-gray-600" />;
    }
  } else if (type === 'delay') {
    return <Clock className="h-4 w-4 text-amber-600" />;
  } else if (type === 'condition') {
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  }
  
  return null;
};

export default StepIcon;

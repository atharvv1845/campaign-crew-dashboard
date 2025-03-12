
import { Mail, Phone, Calendar, MessageSquare } from 'lucide-react';
import React from 'react';

export const getInteractionIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'call':
      return <Phone className="h-4 w-4" />;
    case 'meeting':
      return <Calendar className="h-4 w-4" />;
    case 'message':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

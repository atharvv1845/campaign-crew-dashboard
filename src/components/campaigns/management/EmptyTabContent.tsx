
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyTabContentProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const EmptyTabContent: React.FC<EmptyTabContentProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-muted-foreground opacity-40" />
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      <Button 
        onClick={onButtonClick}
        className="mt-6"
        variant="outline"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyTabContent;

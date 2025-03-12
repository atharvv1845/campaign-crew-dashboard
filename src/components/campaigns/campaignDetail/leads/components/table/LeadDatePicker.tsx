
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface LeadDatePickerProps {
  date?: Date;
  onDateSelect: (date: Date | undefined) => void;
  label: string;
}

const LeadDatePicker: React.FC<LeadDatePickerProps> = ({ date, onDateSelect, label }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="p-0 h-auto font-normal text-left flex items-center gap-2"
        >
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{date ? format(date, 'yyyy-MM-dd') : label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          initialFocus
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};

export default LeadDatePicker;


import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { 
  Mail, 
  Phone, 
  Calendar as CalendarIcon, 
  Building2, 
  User,
  Briefcase,
  Save,
  X,
  CalendarClock,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Lead } from './LeadTableComponent';
import LeadContactMethods from './LeadContactMethods';
import { useForm } from 'react-hook-form';

interface LeadDetailDrawerProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  statusOptions?: string[];
  teamMembers?: string[];
  onUpdateLead?: (lead: Lead) => void;
}

const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  open,
  onClose,
  statusOptions = [],
  teamMembers = [],
  onUpdateLead
}) => {
  const [activeTab, setActiveTab] = useState('details');
  
  const form = useForm({
    defaultValues: {
      name: lead.name || '',
      firstName: lead.firstName || '',
      lastName: lead.lastName || '',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.company || '',
      title: lead.title || '',
      status: lead.status || lead.currentStage || '',
      assignedTo: lead.assignedTo || '',
      notes: lead.notes || '',
      firstContactDate: lead.firstContactDate || '',
      lastContact: lead.lastContact || '',
      nextFollowUpDate: lead.nextFollowUpDate || ''
    }
  });
  
  const handleSubmit = (data: any) => {
    if (onUpdateLead) {
      const updatedLead = {
        ...lead,
        ...data,
        // Ensure both status and currentStage are updated
        status: data.status,
        currentStage: data.status
      };
      
      onUpdateLead(updatedLead);
    }
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>{lead.name}</SheetTitle>
          <SheetDescription>
            View and edit lead information
          </SheetDescription>
        </SheetHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Lead Details</TabsTrigger>
            <TabsTrigger value="contacts">Contact History</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="Email address" {...field} className="pl-9" />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="Phone number" {...field} className="pl-9" />
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Company name" {...field} className="pl-9" />
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Job title" {...field} className="pl-9" />
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.filter(s => s !== 'All Statuses').map(status => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned To</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Assign to team member" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Unassigned</SelectItem>
                          {teamMembers.filter(m => m !== 'All Team Members').map(member => (
                            <SelectItem key={member} value={member}>
                              {member}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="firstContactDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>First Contact</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  formatDate(field.value)
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastContact"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Last Contact</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  formatDate(field.value)
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="nextFollowUpDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Next Follow-up</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  formatDate(field.value)
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Platforms</h3>
                  <LeadContactMethods
                    methods={Object.keys(lead.socialProfiles || {}).filter(
                      key => !!lead.socialProfiles?.[key]
                    )}
                    readOnly={true}
                  />
                </div>

                <SheetFooter className="mt-6">
                  <Button type="submit" className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="contacts" className="space-y-4">
            <div className="bg-muted/10 rounded-md p-4">
              <h3 className="text-sm font-medium mb-3">Contact Timeline</h3>
              
              {lead.firstContactDate || lead.lastContact ? (
                <div className="space-y-4">
                  {lead.firstContactDate && (
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <CalendarClock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">First Contact</div>
                        <div className="text-xs text-muted-foreground">{formatDate(lead.firstContactDate)}</div>
                      </div>
                    </div>
                  )}
                  
                  {lead.lastContact && (
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Last Contact</div>
                        <div className="text-xs text-muted-foreground">{formatDate(lead.lastContact)}</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No contact history available for this lead.</div>
              )}
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Upcoming</h3>
                {lead.nextFollowUpDate ? (
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <CalendarClock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Next Follow-up</div>
                      <div className="text-xs text-muted-foreground">{formatDate(lead.nextFollowUpDate)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No upcoming follow-ups scheduled.</div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add notes about this lead..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <SheetFooter>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Notes
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailDrawer;

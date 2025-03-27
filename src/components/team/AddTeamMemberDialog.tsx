
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TeamMember } from './types';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from '@/components/ui/checkbox';
import { signUp } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AddTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (member: TeamMember) => void;
  withAccess?: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  role: z.string({ required_error: "Please select a role" }),
  bio: z.string().optional(),
  createAccess: z.boolean().optional(),
  password: z.string().optional()
    .refine(val => !val || val.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
});

const AddTeamMemberDialog: React.FC<AddTeamMemberDialogProps> = ({ 
  open, 
  onOpenChange,
  onAdd,
  withAccess = false
}) => {
  const { toast } = useToast();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "Sales Rep",
      bio: "",
      createAccess: false,
      password: "",
    },
  });

  const createAccessValue = form.watch('createAccess');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let hasAccess = false;
    
    if (values.createAccess && values.password) {
      setIsCreatingUser(true);
      
      try {
        // Create a user account in Supabase
        await signUp(values.email, values.password);
        hasAccess = true;
        
        toast({
          title: "Account created",
          description: `Login access created for ${values.name}`
        });
      } catch (error: any) {
        console.error('Error creating user:', error);
        toast({
          title: "Error creating user account",
          description: error.message || "There was an error creating the user account",
          variant: "destructive"
        });
        // Continue with team member creation even if user creation fails
      } finally {
        setIsCreatingUser(false);
      }
    }
    
    const newTeamMember: TeamMember = {
      id: uuidv4(),
      name: values.name,
      email: values.email,
      phone: values.phone || "",
      role: values.role,
      bio: values.bio || "",
      avatar: "",
      status: "Pending",
      createdAt: new Date().toISOString(),
      hasAccess: hasAccess,
    };
    
    onAdd(newTeamMember);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Sales Rep">Sales Rep</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {withAccess && (
              <>
                <FormField
                  control={form.control}
                  name="createAccess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Create Login Access</FormLabel>
                        <FormDescription>
                          Allow this team member to login to the platform
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {createAccessValue && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Minimum 8 characters" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          The team member will be able to change this after first login
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us a bit about this team member..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isCreatingUser}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isCreatingUser}
              >
                {isCreatingUser ? 'Creating User...' : 'Add Team Member'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberDialog;

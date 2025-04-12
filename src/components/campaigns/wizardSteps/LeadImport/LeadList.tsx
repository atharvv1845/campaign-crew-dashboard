
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LeadData } from '../../../types/campaignTypes';
import { PlusCircle, Edit, Trash, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LeadListProps {
  leads: LeadData[];
  onAddLead: () => void;
  onDeleteLead: (id: string | number) => void;
  onUpdateLead: (id: string | number, updates: Partial<LeadData>) => void;
}

const LeadList: React.FC<LeadListProps> = ({ leads, onAddLead, onDeleteLead, onUpdateLead }) => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<LeadData>>({});

  // Start editing a lead
  const handleEdit = (lead: LeadData) => {
    setEditingId(String(lead.id));
    setEditData({
      firstName: lead.firstName || '',
      lastName: lead.lastName || '',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.company || ''
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // Save edited lead
  const handleSave = (id: string | number) => {
    onUpdateLead(id, editData);
    setEditingId(null);
    setEditData({});
    
    toast({
      title: "Lead Updated",
      description: "Lead information successfully updated",
    });
  };

  // Handle input change for editing
  const handleInputChange = (field: keyof LeadData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Delete a lead
  const handleDelete = (id: string | number) => {
    onDeleteLead(id);
    
    toast({
      title: "Lead Removed",
      description: "Lead has been removed from the import list",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">
          Leads to Import ({leads.length})
        </h3>
        <Button 
          onClick={onAddLead} 
          size="sm" 
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Manually
        </Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={String(lead.id)}>
                {editingId === String(lead.id) ? (
                  <>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Input 
                          value={editData.firstName || ''} 
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="First name"
                          className="h-8"
                        />
                        <Input 
                          value={editData.lastName || ''} 
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Last name"
                          className="h-8"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <Input 
                        value={editData.email || ''} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Email"
                        className="h-8"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input 
                        value={editData.company || ''} 
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Company"
                        className="h-8"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleSave(lead.id)} 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button 
                          onClick={handleCancel} 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.firstName} {lead.lastName}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{lead.company}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleEdit(lead)} 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button 
                          onClick={() => handleDelete(lead.id)} 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Trash className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No leads added yet. Import from CSV or add leads manually.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadList;

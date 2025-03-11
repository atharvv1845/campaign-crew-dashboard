
import React, { useState } from 'react';
import { GripVertical, Edit, Trash, Check, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignFormData } from '../types/campaignTypes';

interface LeadStagesProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const LeadStages: React.FC<LeadStagesProps> = ({ formData, setFormData, onNext, onBack }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStageName, setNewStageName] = useState('');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showNewStageInput, setShowNewStageInput] = useState(false);
  const [newStageInput, setNewStageInput] = useState('');
  
  // Start dragging a stage
  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };
  
  // Handle dropping a stage
  const handleDrop = (targetId: string) => {
    if (!draggedItem || draggedItem === targetId) return;
    
    // Find the indices of both items
    const draggedIndex = formData.stages.findIndex(stage => stage.id === draggedItem);
    const targetIndex = formData.stages.findIndex(stage => stage.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    // Create a new array with updated orders
    const newStages = [...formData.stages];
    const [removed] = newStages.splice(draggedIndex, 1);
    newStages.splice(targetIndex, 0, removed);
    
    // Update the order property
    const updatedStages = newStages.map((stage, index) => ({
      ...stage,
      order: index + 1
    }));
    
    // Update form data
    setFormData(prev => ({ ...prev, stages: updatedStages }));
    setDraggedItem(null);
  };
  
  // Edit a stage name
  const startEditing = (id: string, name: string) => {
    setEditingId(id);
    setNewStageName(name);
  };
  
  // Save edited stage name
  const saveEdit = (id: string) => {
    if (newStageName.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map(stage => 
        stage.id === id ? { ...stage, name: newStageName } : stage
      )
    }));
    
    setEditingId(null);
    setNewStageName('');
  };
  
  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setNewStageName('');
  };
  
  // Delete a stage
  const deleteStage = (id: string) => {
    // Show confirmation before deleting
    if (window.confirm('Are you sure you want to delete this stage?')) {
      setFormData(prev => ({
        ...prev,
        stages: prev.stages.filter(stage => stage.id !== id)
          .map((stage, index) => ({ ...stage, order: index + 1 }))
      }));
    }
  };
  
  // Add a new stage
  const addNewStage = () => {
    if (newStageInput.trim() === '') return;
    
    const newStage = {
      id: String(Date.now()),
      name: newStageInput,
      order: formData.stages.length + 1
    };
    
    setFormData(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }));
    
    setNewStageInput('');
    setShowNewStageInput(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Define Lead Stages</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Customize the stages your leads will move through during the campaign.
          Drag to reorder, edit names, or add custom stages.
        </p>
        
        {/* Stages list */}
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/20 border-b border-border">
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Order</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Stage Name</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {formData.stages.map(stage => (
                <tr 
                  key={stage.id}
                  className={cn(
                    "hover:bg-muted/10 transition-colors",
                    draggedItem === stage.id && "opacity-50 bg-muted/20"
                  )}
                  draggable
                  onDragStart={() => handleDragStart(stage.id)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => handleDrop(stage.id)}
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <span className="text-sm">{stage.order}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {editingId === stage.id ? (
                      <input
                        type="text"
                        value={newStageName}
                        onChange={e => setNewStageName(e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit(stage.id);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                      />
                    ) : (
                      <span className="text-sm font-medium">{stage.name}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    {editingId === stage.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => saveEdit(stage.id)}
                          className="p-1 rounded-md hover:bg-muted/50 text-primary hover:text-primary transition-colors"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 rounded-md hover:bg-muted/50 text-destructive hover:text-destructive transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEditing(stage.id, stage.name)}
                          className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteStage(stage.id)}
                          className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Add new stage */}
        <div className="mt-3">
          {showNewStageInput ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={newStageInput}
                onChange={e => setNewStageInput(e.target.value)}
                placeholder="Enter stage name"
                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') addNewStage();
                  if (e.key === 'Escape') {
                    setShowNewStageInput(false);
                    setNewStageInput('');
                  }
                }}
              />
              <button
                onClick={addNewStage}
                disabled={newStageInput.trim() === ''}
                className="p-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setShowNewStageInput(false);
                  setNewStageInput('');
                }}
                className="p-2 bg-destructive text-destructive-foreground rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewStageInput(true)}
              className="flex items-center gap-2 mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Stage</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={formData.stages.length === 0}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadStages;

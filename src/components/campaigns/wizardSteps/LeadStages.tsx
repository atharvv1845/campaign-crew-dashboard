
import React, { useState, useRef } from 'react';
import { PlusCircle, XCircle, GripVertical, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignFormData, StageData } from '../types/campaignTypes';

interface LeadStagesProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const LeadStages: React.FC<LeadStagesProps> = ({ formData, setFormData, onNext, onBack }) => {
  const [newStage, setNewStage] = useState({ name: '', description: '', color: 'bg-blue-500' });
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);
  
  const colorOptions = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
    { name: 'Orange', value: 'bg-orange-500' },
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Pink', value: 'bg-pink-500' },
    { name: 'Indigo', value: 'bg-indigo-500' },
  ];
  
  const handleNewStageChange = (field: keyof typeof newStage, value: string) => {
    setNewStage(prev => ({ ...prev, [field]: value }));
  };
  
  const addNewStage = () => {
    if (!newStage.name) return;
    
    const newId = `stage-${Date.now()}`;
    
    // Create a new StageData object with the required properties
    const stageData: StageData = {
      id: newId,
      name: newStage.name,
      description: newStage.description,
      color: newStage.color
    };
    
    setFormData(prev => ({
      ...prev,
      stages: [...prev.stages, stageData]
    }));
    
    setNewStage({ name: '', description: '', color: 'bg-blue-500' });
  };
  
  const startEditing = (stageId: string) => {
    setEditingStageId(stageId);
  };
  
  const stopEditing = () => {
    setEditingStageId(null);
  };
  
  const updateStage = (stageId: string, field: keyof StageData, value: string) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map(stage => 
        stage.id === stageId ? { ...stage, [field]: value } : stage
      )
    }));
  };
  
  const removeStage = (stageId: string) => {
    // Don't allow removing if it's the only stage
    if (formData.stages.length <= 1) return;
    
    // Check if stage is being used by any lead
    const isStageUsed = formData.leads.some(lead => lead.status === stageId);
    
    if (isStageUsed) {
      alert('Cannot remove a stage that is being used by leads. Please reassign leads first.');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.filter(stage => stage.id !== stageId)
    }));
  };
  
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragEnter = (index: number) => {
    dragOverItemIndex.current = index;
  };
  
  const handleDragEnd = () => {
    if (draggedIndex === null || dragOverItemIndex.current === null) {
      setDraggedIndex(null);
      return;
    }
    
    // Make a copy of the stages array
    const newStages = [...formData.stages];
    
    // Get the item that is being dragged
    const draggedItem = newStages[draggedIndex];
    
    // Remove the item from its original position
    newStages.splice(draggedIndex, 1);
    
    // Insert the item at the new position
    newStages.splice(dragOverItemIndex.current, 0, draggedItem);
    
    // Update the form data with the reordered stages
    setFormData(prev => ({
      ...prev,
      stages: newStages
    }));
    
    // Reset state
    setDraggedIndex(null);
    dragOverItemIndex.current = null;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Lead Stages</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Define the stages that leads will progress through during this campaign.
        </p>
        
        {/* Stage list */}
        <div className="space-y-2 mb-6">
          {formData.stages.map((stage, index) => (
            <div 
              key={stage.id}
              className={cn(
                "border border-border rounded-lg p-4",
                editingStageId === stage.id ? "border-primary" : "hover:border-primary/50",
                draggedIndex === index && "opacity-50"
              )}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex items-center gap-3">
                <div className="cursor-move flex items-center">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div
                  className={cn(
                    "h-4 w-4 rounded-full",
                    stage.color
                  )}
                />
                
                {editingStageId === stage.id ? (
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={stage.name}
                        onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <input
                        type="text"
                        value={stage.description}
                        onChange={(e) => updateStage(stage.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Color</label>
                      <select
                        value={stage.color}
                        onChange={(e) => updateStage(stage.id, 'color', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {colorOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={stopEditing}
                        className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-md"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <h4 className="font-medium">{stage.name}</h4>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditing(stage.id)}
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeStage(stage.id)}
                        className="p-1 text-muted-foreground hover:text-destructive"
                        disabled={formData.stages.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Add new stage form */}
        <div className="border border-dashed border-border rounded-lg p-4 mt-4">
          <h4 className="text-sm font-medium mb-3">Add New Stage</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Name</label>
              <input
                type="text"
                value={newStage.name}
                onChange={(e) => handleNewStageChange('name', e.target.value)}
                placeholder="e.g., Discovery Call"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Description</label>
              <input
                type="text"
                value={newStage.description}
                onChange={(e) => handleNewStageChange('description', e.target.value)}
                placeholder="Brief description of this stage"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Color</label>
              <select
                value={newStage.color}
                onChange={(e) => handleNewStageChange('color', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={addNewStage}
              disabled={!newStage.name}
              className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
            >
              <PlusCircle className="h-4 w-4" />
              Add Stage
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Tip: Drag and drop to reorder stages. The order here will be used throughout the campaign.</p>
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
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadStages;

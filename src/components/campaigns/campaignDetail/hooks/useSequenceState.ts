
import { useState } from 'react';
import { MessageStep, SavedWorkflow } from './sequenceTypes';

export const useSequenceState = () => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [editingStepData, setEditingStepData] = useState<MessageStep | null>(null);
  
  // Initial message sequence data
  const [sequence, setSequence] = useState<MessageStep[]>([
    {
      id: 1,
      type: 'email',
      content: 'Initial outreach email introducing our product',
      delay: null,
    },
    {
      id: 2,
      type: 'delay',
      content: null,
      delay: '3 days',
    },
    {
      id: 3,
      type: 'email',
      content: 'Follow-up email if no response',
      delay: null,
    },
    {
      id: 4,
      type: 'delay',
      content: null,
      delay: '4 days',
    },
    {
      id: 5,
      type: 'linkedin',
      content: 'LinkedIn connection request with personalized message',
      delay: null,
    },
    {
      id: 6,
      type: 'delay',
      content: null,
      delay: '5 days',
    },
    {
      id: 7,
      type: 'call',
      content: 'Call to discuss potential fit',
      delay: null,
    },
  ]);
  
  // Saved workflows
  const [savedWorkflows, setSavedWorkflows] = useState<SavedWorkflow[]>([
    { id: 1, name: 'Standard Follow-up Sequence', sequence: [] },
    { id: 2, name: 'Cold Email Campaign', sequence: [] },
  ]);

  return {
    sequence,
    setSequence,
    editingStep,
    setEditingStep,
    editingStepData,
    setEditingStepData,
    showSaveDialog,
    setShowSaveDialog,
    showLoadDialog,
    setShowLoadDialog,
    workflowName,
    setWorkflowName,
    savedWorkflows,
    setSavedWorkflows
  };
};

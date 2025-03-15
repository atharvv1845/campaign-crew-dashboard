
import React from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  Node, 
  Edge, 
  NodeTypes,
  ConnectionLineType,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FlowStep } from '../OutreachFlow';
import MessageNode from './flowNodes/MessageNode';
import DelayNode from './flowNodes/DelayNode';
import ConditionNode from './flowNodes/ConditionNode';

interface FlowVisualizationProps {
  steps: FlowStep[];
  onEditStep: (step: FlowStep) => void;
  onDeleteStep: (id: number) => void;
}

const nodeTypes: NodeTypes = {
  message: MessageNode,
  delay: DelayNode,
  condition: ConditionNode,
};

const FlowVisualization: React.FC<FlowVisualizationProps> = ({
  steps,
  onEditStep,
  onDeleteStep
}) => {
  // Transform steps into nodes and edges for ReactFlow
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Position calculation
  let xPosition = 250;
  let yPosition = 50;
  
  // Create nodes and edges
  steps.forEach((step, index) => {
    // Create node
    nodes.push({
      id: step.id.toString(),
      type: step.type,
      position: { x: xPosition, y: yPosition },
      data: {
        ...step,
        onEdit: () => onEditStep(step),
        onDelete: () => onDeleteStep(step.id),
      },
    });
    
    // Create edge from previous node
    if (index > 0) {
      edges.push({
        id: `e${steps[index-1].id}-${step.id}`,
        source: steps[index-1].id.toString(),
        target: step.id.toString(),
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      });
    }
    
    // Update positions for next node
    yPosition += 150;
  });

  return (
    <div className="h-[500px] border rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true
        }}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <Background color="#f0f0f0" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default FlowVisualization;

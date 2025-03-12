
import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  NodeTypes, 
  Panel, 
  ConnectionLineType, 
  ConnectionMode,
  MarkerType, 
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import MessageNode from '../flowNodes/MessageNode';
import DelayNode from '../flowNodes/DelayNode';
import ConditionNode from '../flowNodes/ConditionNode';
import FlowStatistics from './FlowStatistics';
import { Button } from '@/components/ui/button';
import { Mail, Clock, GitBranch, ArrowRight } from 'lucide-react';

const nodeTypes: NodeTypes = {
  messageNode: MessageNode,
  delayNode: DelayNode,
  conditionNode: ConditionNode,
};

interface FlowCanvasProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onNodeClick: any;
  onAddNodeType?: (type: 'message' | 'delay' | 'condition') => void;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onAddNodeType,
}) => {
  return (
    <div className="border rounded-md flex-1 min-h-[400px] relative">
      <div className="absolute top-2 left-2 z-10 flex space-x-2 bg-white/80 p-2 rounded shadow-sm">
        {onAddNodeType && (
          <>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAddNodeType('message')}
              className="flex items-center"
            >
              <Mail className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAddNodeType('delay')}
              className="flex items-center"
            >
              <Clock className="h-4 w-4 mr-1" />
              Delay
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAddNodeType('condition')}
              className="flex items-center"
            >
              <GitBranch className="h-4 w-4 mr-1" />
              Condition
            </Button>
          </>
        )}
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#3b82f6',
          },
        }}
        fitView
        className="bg-white"
      >
        <Background />
        <Controls />
        <FlowStatistics nodeCount={nodes.length} edgeCount={edges.length} />
        
        {/* Empty state message */}
        {nodes.length === 0 && (
          <Panel position="top-center" className="text-center p-4 bg-white/80 rounded-md shadow-sm">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-muted-foreground">
                Your message flow is empty. Add message steps using the buttons above.
              </p>
              <p className="text-sm text-muted-foreground">
                Create a sequence by adding messages, delays, and conditions.
              </p>
              {onAddNodeType && (
                <Button 
                  onClick={() => onAddNodeType('message')}
                  size="sm"
                  className="mt-2"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Add First Message
                </Button>
              )}
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;

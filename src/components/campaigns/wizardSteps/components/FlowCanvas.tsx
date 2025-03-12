
import React from 'react';
import ReactFlow, { Background, Controls, NodeTypes, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import MessageNode from '../flowNodes/MessageNode';
import DelayNode from '../flowNodes/DelayNode';
import ConditionNode from '../flowNodes/ConditionNode';
import FlowStatistics from './FlowStatistics';

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
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
}) => {
  return (
    <div className="border rounded-md flex-1 min-h-[400px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-white"
      >
        <Background />
        <Controls />
        <FlowStatistics nodeCount={nodes.length} edgeCount={edges.length} />
        
        {/* Empty state message */}
        {nodes.length === 0 && (
          <Panel position="center" className="text-center p-4 bg-white/80 rounded-md shadow-sm">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-muted-foreground">
                Your message flow is empty. Use the buttons above to add message steps.
              </p>
              <p className="text-sm text-muted-foreground">
                Start with a message node to begin creating your flow sequence.
              </p>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;

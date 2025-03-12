
import React from 'react';
import ReactFlow, { Background, Controls, NodeTypes } from 'reactflow';
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
    <div className="border rounded-md flex-1 min-h-[400px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <FlowStatistics nodeCount={nodes.length} edgeCount={edges.length} />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;

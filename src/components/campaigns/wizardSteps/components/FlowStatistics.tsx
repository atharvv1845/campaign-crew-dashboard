
import React from 'react';
import { Panel } from 'reactflow';

interface FlowStatisticsProps {
  nodeCount: number;
  edgeCount: number;
}

const FlowStatistics: React.FC<FlowStatisticsProps> = ({ nodeCount, edgeCount }) => {
  return (
    <Panel position="top-right">
      <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-md text-xs">
        {nodeCount} nodes | {edgeCount} connections
      </div>
    </Panel>
  );
};

export default FlowStatistics;

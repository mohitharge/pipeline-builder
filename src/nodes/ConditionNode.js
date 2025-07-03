import { Position } from "reactflow";
import { AbstractNode } from "../Components/AbstractNode";
import { useState } from "react";

export const ConditionNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    condition: data?.condition || '==',
  });

  const handleChange = (key, value) => setNodeData({ ...nodeData, [key]: value });

  return (
    <AbstractNode
      id={id}
      title="Conditional"
      data={nodeData}
      onChange={handleChange}
      inputFields={[
        { key: 'condition', label: 'If A', type: 'select', options: ['==', '!=', '<', '>', '<=', '>='] },
      ]}
      handles={[
        { type: 'target', position: Position.Left, key: 'a', style: { top: '30%' } },
        { type: 'target', position: Position.Left, key: 'b', style: { top: '60%' } },
        { type: 'source', position: Position.Right, key: 'true' },
        { type: 'source', position: Position.Right, key: 'false', style: { top: '75%' } },
      ]}
    />
  );
};
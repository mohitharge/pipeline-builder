// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const TextNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    currText: data?.text || '{{input}}',
  });

  const handleChange = (key, value) => {
    setNodeData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AbstractNode
      id={id}
      title="Text"
      data={nodeData}
      onChange={handleChange}
      fields={[
        { key: 'text', label: 'Text', type: 'text' },
      ]}
      handles={[
        { type: 'source', position: Position.Right, key: 'output' },
      ]}
    />
  );
}

// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const OutputNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data?.outputType || 'Text',
  });

  const handleChange = (key, value) => {
    setNodeData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AbstractNode
      id={id}
      title="Output"
      data={nodeData}
      onChange={handleChange}
      fields={[
        { key: 'outputName', label: 'Name', type: 'text' },
        { key: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'] },
      ]}
      handles={[
        { type: 'target', position: Position.Left, key: 'value' },
      ]}
    />
  );
}

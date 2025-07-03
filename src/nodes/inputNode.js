// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const InputNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text',
  });

  const handleChange = (key, value) => {
    setNodeData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AbstractNode
      id={id}
      title="Input"
      icon="/Assets/input.png"
      data={nodeData}
      onChange={handleChange}
      inputFields={[
        { key: 'inputName', label: 'Name', type: 'text' },
        { key: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'] },
      ]}
      handles={[
        { type: 'source', position: Position.Right, key: 'value' },
      ]}
    />
  );
}
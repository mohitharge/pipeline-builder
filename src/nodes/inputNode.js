// inputNode.js

import { useEffect, useState } from 'react';
import { Position, useReactFlow } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const InputNode = ({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [nodeData, setNodeData] = useState({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text',
  });

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...nodeData } }
          : node
      )
    );
  }, [id, nodeData, setNodes]);

  const handleChange = (key, value) => {
    setNodeData((prev) => ({ ...prev, [key]: value }));
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, inputName: value } } : node
      )
    );
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
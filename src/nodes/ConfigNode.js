import { useState } from 'react';
import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const ConfigNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    theme: 'Light',
    enabledModules: [],
  });

  const handleChange = (key, value) => setNodeData({ ...nodeData, [key]: value });

  return (
    <AbstractNode
      id={id}
      title="Config"
      data={nodeData}
      onChange={handleChange}
      inputFields={[
        { key: 'theme', label: 'Theme', type: 'select', options: ['Light', 'Dark'] },
        { key: 'enabledModules', label: 'Modules', type: 'checkbox', options: ['Chat', 'Search', 'Analytics'] },
      ]}
      handles={[{ type: 'source', position: Position.Right, key: 'config' }]}
    />
  );
};
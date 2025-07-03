import { useState } from 'react';
import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const APICallNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    url: '',
    method: 'GET',
    authRequired: false,
  });

  const handleChange = (key, value) => setNodeData({ ...nodeData, [key]: value });

  return (
    <AbstractNode
      id={id}
      title="API Call"
      data={nodeData}
      onChange={handleChange}
      inputFields={[
        { key: 'url', label: 'Endpoint URL', type: 'text' },
        { key: 'method', label: 'HTTP Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'] },
        { key: 'authRequired', label: 'Requires Auth', type: 'toggle' },
      ]}
      handles={[
        { type: 'target', position: Position.Left, key: 'payload' },
        { type: 'source', position: Position.Right, key: 'response' },
      ]}
    />
  );
};
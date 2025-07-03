import { useState } from 'react';
import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const CommentNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    comment: '',
    markImportant: false,
  });

  const handleChange = (key, value) => setNodeData({ ...nodeData, [key]: value });

  return (
    <AbstractNode
      id={id}
      title="Comment"
      data={nodeData}
      onChange={handleChange}
      inputFields={[
        { key: 'comment', label: 'Your Comment', type: 'textarea' },
        { key: 'markImportant', label: 'Important?', type: 'toggle' },
      ]}
      handles={[{ type: 'source', position: Position.Right, key: 'note' }]}
    />
  );
};
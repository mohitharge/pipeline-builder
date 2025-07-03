import { useState } from 'react';
import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const SurveyNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    name: '',
    experience: 'Beginner',
    skills: [],
  });

  const handleChange = (key, value) => setNodeData({ ...nodeData, [key]: value });

  return (
    <AbstractNode
      id={id}
      title="Survey"
      data={nodeData}
      onChange={handleChange}
      inputFields={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'experience', label: 'Experience Level', type: 'radio', options: ['Beginner', 'Intermediate', 'Expert'] },
        { key: 'skills', label: 'Skills', type: 'checkbox', options: ['JavaScript', 'React', 'Node.js'] },
      ]}
      handles={[{ type: 'source', position: Position.Right, key: 'formData' }]}
    />
  );
};
// llmNode.js

import { Position } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';

export const LLMNode = ({ id, data }) => {

  return (
    <AbstractNode
      id={id}
      title="LLM"
      data={data}
      onChange={null}
      handles={[
        { type: 'target', position: Position.Left, key: 'system', style: { top: `${100/3}%` } },
        { type: 'target', position: Position.Left, key: 'prompt', style: { top: `${200/3}%` } },
        { type: 'source', position: Position.Right, key: 'response' },
      ]}
    />
  );
}
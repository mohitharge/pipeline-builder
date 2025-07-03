// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='ConditionNode' label='Condition' />
                <DraggableNode type='ConfigNode' label='Config' />
                <DraggableNode type='APICallNode' label='API Call' />
                <DraggableNode type='CommentNode' label='Comment' />
                <DraggableNode type='SurveyNode' label='Survey' />
            </div>
        </div>
    );
};

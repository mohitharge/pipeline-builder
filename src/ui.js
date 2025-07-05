// ui.js
// Displays the drag-and-drop UI

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStoreWithEqualityFn, useThemeStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { SurveyNode } from './nodes/SurveyNode';
import { CommentNode } from './nodes/CommentNode';
import { ConditionNode } from './nodes/ConditionNode';
import { ConfigNode } from './nodes/ConfigNode';
import { APICallNode } from './nodes/APICallNode';
import { SubmitButton } from './submit';
import 'reactflow/dist/style.css';
import { isDesktop } from './toolbar';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  ConditionNode: ConditionNode,
  ConfigNode: ConfigNode,
  APICallNode: APICallNode,
  CommentNode: CommentNode,
  SurveyNode: SurveyNode
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const { darkMode } = useThemeStore();
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [canvasHeight, setCanvasHeight] = useState('100vh');
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStoreWithEqualityFn(selector, shallow);

    useEffect(() => {
    const updateCanvasHeight = () => {
      const toolbar = document.getElementById('toolbar');
      const toolbarHeight = toolbar?.offsetHeight || 0;
      setCanvasHeight(`${window.innerHeight - toolbarHeight}px`);
    };

    updateCanvasHeight();
    window.addEventListener('resize', updateCanvasHeight);
    return () => window.removeEventListener('resize', updateCanvasHeight);
  }, []);

    const getInitNodeData = useCallback((nodeID, type) => {
      return { id: nodeID, nodeType: `${type}` };
    }, []);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [addNode, getNodeID, reactFlowInstance, getInitNodeData]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

  useEffect(() => {
    const handleTouchDrag = (e) => {
      const { nodeType } = e.detail;
      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: window.innerWidth / 2 - bounds.left,
        y: window.innerHeight / 2 - bounds.top,
      });

      const nodeID = getNodeID(nodeType);
      const newNode = {
        id: nodeID,
        type: nodeType,
        position,
        data: getInitNodeData(nodeID, nodeType),
      };

      addNode(newNode);
    };

    window.addEventListener('touchdragstart', handleTouchDrag);
    return () => window.removeEventListener('touchdragstart', handleTouchDrag);
  }, [reactFlowInstance, getNodeID, getInitNodeData, addNode]);

    return (
        <>
        <div ref={reactFlowWrapper} style={{ width: '100%', height: canvasHeight }}>
            <ReactFlow
                className={`react-flow-container ${darkMode ? 'dark' : 'light'}`}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                { isDesktop && <MiniMap /> }
                <SubmitButton nodes={nodes} edges={edges} />
            </ReactFlow>
        </div>
        </>
    )
}

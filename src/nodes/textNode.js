// textNode.js

import { useLayoutEffect, useRef, useState } from 'react';
import { useReactFlow, Position, useStore, MarkerType } from 'reactflow';
import { AbstractNode } from '../Components/AbstractNode';
import { shallow } from 'zustand/shallow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [nodeData, setNodeData] = useState({
    text: data?.text || '{{input}}',
  });

  const connectedVars = useRef(new Set());

  const { setEdges, getEdges, addEdges, getNodes } = useReactFlow();

  const inputNames = useStore(
    (state) =>
      Array.from(state.nodeInternals.values())
        .filter((n) => n.type === 'customInput' && n.data?.inputName)
        .map((n) => n.data.inputName),
    shallow
  );

  useLayoutEffect(() => {
    const matchedVars = Array.from(
      nodeData.text.matchAll(VARIABLE_REGEX),
      (match) => match[1]
    ).filter((v) => inputNames.includes(v));

    const allNodes = getNodes();
    const existingEdges = getEdges();
    const getSourceNode = (varName) => allNodes.find((n) => n.type === 'customInput' && n.data?.inputName === varName);

    // Remove edges for non-matched variables
    const removedVars = Array.from(connectedVars.current).filter(
      (v) => !matchedVars.includes(v)
    );

    removedVars.forEach((varName) => {
      const sourceNode = getSourceNode(varName)
      const edgeToRemove = existingEdges.find(
        (e) =>
          e.source === sourceNode?.id &&
          e.target === id
      );

      if (edgeToRemove) {
        setEdges((edges) => edges.filter((e) => e.id !== edgeToRemove.id));
      }

      connectedVars.current.delete(varName);
    });

    // Add edges for matched variables
    matchedVars.forEach((varName) => {
      const sourceNode = getSourceNode(varName)
      const alreadyConnected = existingEdges.some(
        (e) =>
          e.source === sourceNode?.id && e.target === id
      );

      if (sourceNode && !alreadyConnected && !connectedVars.current.has(varName)) {
        const edgeId = `edge-${sourceNode.id}-${id}`;
        addEdges({
          id: edgeId,
          source: sourceNode.id,
          sourceHandle: 'value',
          target: id,
          targetHandle: `inputVars`,
          style: {stroke: '#6366f1', strokeDasharray: 7 },
          animated: true, 
          markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px', color: '#6366f1'},
        });
        connectedVars.current.add(varName);
      }
    });
  }, [nodeData.text, inputNames, setEdges, addEdges, getEdges, getNodes, id]);

  const handleChange = (key, value) => {
    setNodeData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AbstractNode
      id={id}
      title="Text"
      icon="/Assets/text.png"
      data={nodeData}
      onChange={handleChange}
      inputFields={[{ key: 'text', label: 'Text', type: 'textarea' }]}
      handles={[
        { type: 'target', position: Position.Left, key: 'inputVars'},
        { type: 'source', position: Position.Right, key: 'output' },
      ]}
    />
  );
}

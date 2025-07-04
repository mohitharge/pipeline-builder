// store.js

import { createWithEqualityFn } from 'zustand/traditional';

import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStoreWithEqualityFn = createWithEqualityFn((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      const edgeId = `edge-${connection.source}-${connection.target}`;
      const newEdge = {
        ...connection,
        id: edgeId,
        animated: true,
        style: {
          stroke: '#6366f1',
          strokeDasharray: 8,
        },
        markerEnd: {
          type: MarkerType.Arrow,
          height: '20px',
          width: '20px',
          color: '#6366f1',
        },
      };

      set({
        edges: addEdge(newEdge, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));

import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import SaveButton from './SaveButton';
import './FlowBuilder.css';

// Define custom node types
const nodeTypes = {
  textNode: TextNode,
};

/**
 * Main Flow Builder Component
 *
 * This component integrates React Flow with custom nodes and panels.
 * Features:
 * - Drag and drop nodes from the panel
 * - Node selection and editing
 * - Panel switching between nodes and settings
 * - Edge management with validation
 *
 * @returns {JSX.Element} The rendered flow builder component
 */
const FlowBuilder = () => {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // UI state management
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  
  // Ref for generating unique node IDs
  const nodeIdRef = useRef(1);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  /**
   * Handle new edge connections
   * Validates edge rules before adding - each source can only have one outgoing edge
   *
   * @param {Object} params - Connection parameters from React Flow
   * @param {string} params.source - Source node ID
   * @param {string} params.target - Target node ID
   */
  const onConnect = useCallback(
    (params) => {
      // Check if source handle already has an edge (only one allowed)
      const sourceHasEdge = edges.some(edge =>
        edge.source === params.source
      );

      if (sourceHasEdge) {
        console.warn('Source handle can only have one outgoing edge');
        // Show visual feedback to user
        alert('Each node can only have one outgoing connection');
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  /**
   * Handle node selection
   * Shows settings panel when a node is selected
   *
   * @param {MouseEvent} _event - The click event (unused)
   * @param {Object} node - The selected node object
   */
  const onNodeClick = useCallback((_event, node) => {
    setSelectedNode(node);
    setShowSettingsPanel(true);
  }, []);

  /**
   * Handle clicking on empty canvas
   * Deselects nodes and shows nodes panel
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowSettingsPanel(false);
  }, []);

  /**
   * Handle drag over event for drop zone
   * Prevents default behavior and sets drop effect
   *
   * @param {DragEvent} event - The drag over event
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle drop event to create new nodes
   * Creates a new node at the drop position with auto-generated ID and default text
   *
   * @param {DragEvent} event - The drop event containing node type data
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${nodeIdRef.current++}`,
        type,
        position,
        data: { 
          text: `Message ${nodeIdRef.current - 1}` 
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Update node data
   * Updates the data property of a specific node by ID
   *
   * @param {string} nodeId - The ID of the node to update
   * @param {Object} newData - The new data object for the node
   */
  const onUpdateNode = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: newData } : node
      )
    );
  }, [setNodes]);

  /**
   * Handle back button in settings panel
   * Returns to nodes panel and deselects current node
   */
  const handleBackToNodes = useCallback(() => {
    setShowSettingsPanel(false);
    setSelectedNode(null);
  }, []);

  return (
    <div className="flow-builder">
      {/* Save button */}
      <SaveButton nodes={nodes} edges={edges} />

      {/* Main flow area */}
      <div className="flow-container" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Right panel - switches between nodes and settings */}
      <div className="right-panel">
        {showSettingsPanel ? (
          <SettingsPanel
            selectedNode={selectedNode}
            onUpdateNode={onUpdateNode}
            onBack={handleBackToNodes}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  );
};

export default FlowBuilder;

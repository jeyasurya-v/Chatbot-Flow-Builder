import React from 'react';
import './NodesPanel.css';

/**
 * Nodes Panel Component
 *
 * This panel displays available node types that can be dragged into the flow.
 * Currently supports:
 * - Message Node (Text Node)
 *
 * The panel is designed to be extensible for future node types.
 *
 * @returns {JSX.Element} The rendered nodes panel component
 */
const NodesPanel = () => {
  /**
   * Handle drag start event for node types
   * Sets the node type in the drag data transfer for React Flow to process
   *
   * @param {DragEvent} event - The drag start event
   * @param {string} nodeType - The type of node being dragged (e.g., 'textNode')
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="nodes-panel">
      <div className="panel-header">
        <h3>Nodes Panel</h3>
      </div>
      
      <div className="panel-content">
        {/* Message Node - draggable */}
        <div
          className="node-item"
          draggable
          onDragStart={(event) => onDragStart(event, 'textNode')}
        >
          <div className="node-preview">
            <span className="node-icon">💬</span>
            <span className="node-label">Message</span>
          </div>
          <div className="node-description">
            Send a text message
          </div>
        </div>
        
        {/* Placeholder for future node types */}
        {/* 
        <div
          className="node-item"
          draggable
          onDragStart={(event) => onDragStart(event, 'imageNode')}
        >
          <div className="node-preview">
            <span className="node-icon">🖼️</span>
            <span className="node-label">Image</span>
          </div>
          <div className="node-description">
            Send an image
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default NodesPanel;

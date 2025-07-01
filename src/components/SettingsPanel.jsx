import React, { useState, useEffect } from 'react';
import './SettingsPanel.css';

/**
 * Settings Panel Component
 *
 * This panel appears when a node is selected and allows editing of node properties.
 * Features:
 * - Back button to return to nodes panel
 * - Text input for editing message content
 * - Real-time updates to the selected node
 *
 * @param {Object} props - Component props
 * @param {Object} props.selectedNode - The currently selected node object
 * @param {string} props.selectedNode.id - Unique identifier for the node
 * @param {Object} props.selectedNode.data - Node data containing text and other properties
 * @param {Function} props.onUpdateNode - Callback function to update node data
 * @param {Function} props.onBack - Callback function to return to nodes panel
 * @returns {JSX.Element|null} The rendered settings panel or null if no node selected
 */
const SettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  const [text, setText] = useState('');

  // Update local text state when selected node changes
  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      setText(selectedNode.data.text || '');
    }
  }, [selectedNode]);

  /**
   * Handle text input changes
   * Updates the node data in real-time as the user types
   *
   * @param {Event} event - The input change event
   */
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    
    // Update the node data immediately
    if (selectedNode && onUpdateNode) {
      onUpdateNode(selectedNode.id, {
        ...selectedNode.data,
        text: newText
      });
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="settings-panel">
      {/* Panel header with back button */}
      <div className="panel-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h3>Message Settings</h3>
      </div>
      
      <div className="panel-content">
        {/* Text input section */}
        <div className="input-section">
          <label htmlFor="message-text" className="input-label">
            Text
          </label>
          <textarea
            id="message-text"
            className="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your message here..."
            rows={4}
          />
        </div>
        
        {/* Future settings can be added here */}
        {/*
        <div className="input-section">
          <label className="input-label">
            Message Type
          </label>
          <select className="select-input">
            <option value="text">Text</option>
            <option value="quick-reply">Quick Reply</option>
          </select>
        </div>
        */}
      </div>
    </div>
  );
};

export default SettingsPanel;

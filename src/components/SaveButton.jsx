import React, { useState } from 'react';
import './SaveButton.css';

/**
 * Save Button Component
 *
 * This component handles saving the flow with validation.
 * Validation rules:
 * - All nodes except the last one should have outgoing connections
 * - Shows error message if validation fails
 * - Shows success message if validation passes
 *
 * @param {Object} props - Component props
 * @param {Array} props.nodes - Array of flow nodes
 * @param {Array} props.edges - Array of flow edges/connections
 * @returns {JSX.Element} The rendered save button component
 */
const SaveButton = ({ nodes, edges }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  /**
   * Validate the flow before saving
   * Checks that only one node (the end node) has no outgoing connections
   *
   * @returns {Object} Validation result with isValid boolean and message string
   */
  const validateFlow = () => {
    if (nodes.length === 0) {
      return { isValid: false, message: 'Cannot save empty flow' };
    }

    if (nodes.length === 1) {
      return { isValid: true, message: 'Flow saved successfully!' };
    }

    // Find nodes that have no outgoing edges
    const nodesWithoutOutgoing = nodes.filter(node => {
      return !edges.some(edge => edge.source === node.id);
    });

    // If more than one node has no outgoing edges, it's invalid
    if (nodesWithoutOutgoing.length > 1) {
      return {
        isValid: false,
        message: 'Cannot save Flow. More than one node has empty target handles.'
      };
    }

    return { isValid: true, message: 'Flow saved successfully!' };
  };

  /**
   * Handle save button click
   * Validates the flow and shows appropriate success/error messages
   */
  const handleSave = () => {
    const validation = validateFlow();
    
    setMessageType(validation.isValid ? 'success' : 'error');
    setMessage(validation.message);

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);

    // If valid, you could save to backend here
    if (validation.isValid) {
      console.log('Saving flow:', { nodes, edges });
      // TODO: Implement actual save functionality
    }
  };

  return (
    <div className="save-button-container">
      {/* Error/Success message */}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      
      {/* Save button */}
      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default SaveButton;

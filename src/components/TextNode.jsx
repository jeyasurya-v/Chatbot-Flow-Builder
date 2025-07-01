import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './TextNode.css';

/**
 * Custom Text Node Component
 *
 * This component represents a text message node in the chatbot flow.
 * Features:
 * - Displays text content with "Send Message" header
 * - Has a target handle (top) for incoming connections
 * - Has a source handle (bottom) for outgoing connections
 * - Styled to match the design mockup
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Node data containing text content
 * @param {string} props.data.text - The message text to display
 * @param {boolean} props.selected - Whether the node is currently selected
 * @returns {JSX.Element} The rendered text node component
 */
const TextNode = ({ data, selected }) => {
  return (
    <div className={`text-node ${selected ? 'selected' : ''}`}>
      {/* Target handle - allows multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="target-handle"
        isConnectable={true}
      />
      
      {/* Node header */}
      <div className="node-header">
        <span className="message-icon">💬</span>
        <span className="node-title">Send Message</span>
      </div>
      
      {/* Node content - displays the text message */}
      <div className="node-content">
        {data.text || 'Enter your message here...'}
      </div>
      
      {/* Source handle - allows only one outgoing connection */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="source-handle"
        isConnectable={true}
      />
    </div>
  );
};

export default TextNode;

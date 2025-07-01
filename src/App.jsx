import React from 'react';
import FlowBuilder from './components/FlowBuilder';
import './App.css';

/**
 * Main App Component
 *
 * This is the root component of the Chatbot Flow Builder application.
 * It renders the FlowBuilder component which contains all the functionality.
 *
 * @returns {JSX.Element} The rendered application component
 */
function App() {
  return (
    <div className="App">
      <FlowBuilder />
    </div>
  );
}

export default App;

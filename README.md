# Chatbot Flow Builder

A React-based visual flow builder for creating chatbot conversation flows using React Flow.

## 🚀 Live Demo

[View Live Application](https://chatbot-flow-builder-ecru-kappa.vercel.app/)

## 📋 Features

### ✅ Implemented Features

1. **Text Node Support**
   - Drag and drop text message nodes from the nodes panel
   - Each node displays "Send Message" header with message icon
   - Editable text content through the settings panel

2. **Nodes Panel**
   - Extensible panel design for future node types
   - Currently supports Message nodes
   - Drag and drop functionality to add nodes to the flow

3. **Settings Panel**
   - Appears when a node is selected
   - Text editing capability for message content
   - Back button to return to nodes panel
   - Real-time updates to node content

4. **Edge Management**
   - Visual connections between nodes
   - Source handles: Only one outgoing edge allowed per node
   - Target handles: Multiple incoming edges allowed
   - Visual feedback for connection validation

5. **Save Functionality**
   - Save button with flow validation
   - Error message if multiple nodes have no outgoing connections
   - Success message when flow is valid
   - Prevents saving invalid flows

6. **Interactive Flow Canvas**
   - Pan and zoom capabilities
   - Node selection and movement
   - Mini-map for navigation
   - Background grid pattern
   - Viewport controls

## 🛠️ Technology Stack

- **React** - Frontend framework
- **React Flow** - Flow diagram library
- **Vite** - Build tool and development server
- **CSS3** - Styling and layout

## 🏗️ Project Structure

```
src/
├── components/
│   ├── FlowBuilder.jsx      # Main flow builder component
│   ├── FlowBuilder.css      # Flow builder styles
│   ├── TextNode.jsx         # Custom text node component
│   ├── TextNode.css         # Text node styles
│   ├── NodesPanel.jsx       # Draggable nodes panel
│   ├── NodesPanel.css       # Nodes panel styles
│   ├── SettingsPanel.jsx    # Node settings panel
│   ├── SettingsPanel.css    # Settings panel styles
│   ├── SaveButton.jsx       # Save functionality
│   └── SaveButton.css       # Save button styles
├── App.jsx                  # Root application component
├── App.css                  # Application styles
├── index.css                # Global styles
└── main.jsx                 # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:jeyasurya-v/Chatbot-Flow-Builder.git
cd chatbot-flow-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📖 How to Use

1. **Adding Nodes**: Drag the "Message" node from the right panel onto the canvas
2. **Editing Nodes**: Click on any node to open the settings panel and edit its text
3. **Connecting Nodes**: Drag from the bottom handle of one node to the top handle of another
4. **Saving Flow**: Click the "Save Changes" button to validate and save your flow

### Validation Rules

- Each node can have only one outgoing connection (from bottom handle)
- Nodes can have multiple incoming connections (to top handle)
- Only one node should have no outgoing connections (the end node)
- Empty flows cannot be saved

## 🎨 Design Features

- Clean, modern interface matching the provided mockups
- Responsive layout that works on different screen sizes
- Visual feedback for user interactions
- Consistent color scheme and typography
- Smooth animations and transitions

## 🔧 Extensibility

The application is designed to be easily extensible:

- **New Node Types**: Add new node components and register them in the `nodeTypes` object
- **Additional Settings**: Extend the settings panel with new input fields
- **Custom Validation**: Add new validation rules in the save functionality
- **Styling**: Modify CSS files to customize the appearance

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new 'createRoot' from react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App';  // Import your main App component

// Get the root element where you want to render the app
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);  // Create root using 'createRoot'

root.render(
  <BrowserRouter>  {/* Wrap App with BrowserRouter */}
    <App />
  </BrowserRouter>
);

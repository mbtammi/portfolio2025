import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new 'createRoot' from react-dom/client
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Get the root element where you want to render the app
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);  // Create root using 'createRoot'

root.render(
  <HashRouter> 
    <App />
  </HashRouter>
);

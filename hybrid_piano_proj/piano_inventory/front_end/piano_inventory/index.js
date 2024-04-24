// This file is the source JS file defined in webpack.config.js

// Import React
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import React component
import App from '../../components/App';

// Retrieve the DOM node that will render the bundled JS
const rootElement = document.getElementById('js-framework-home');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
//Build a div with text

// const webpackInsert = () => {
//     console.log("Component function");
//     const element = document.createElement('div');
//     element.innerHTML = 'Inserting static js file';
//     return element;
//   }

//   document.querySelector("#js-insert").appendChild(webpackInsert());
  
// console.log("Webpack insert function")

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '../../components/App';

const rootElement = document.getElementById('js-framework-home');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
// Build a div with text

// const webpackInsert = () => {
//     console.log("Component function");
//     const element = document.createElement('div');
//     element.innerHTML = 'Inserting static js file';
//     return element;
//   }

//   document.querySelector("#js-insert").appendChild(webpackInsert());
  
// console.log("Webpack insert function")

import React from 'react';
import ReactDOM from "react-dom";

ReactDOM.render(
  <h3>This is a React component rendered in a Django app</h3>,
  document.getElementById('root')
);
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
import ListView from '../../components/listView';

ReactDOM.render(
  <h3>This is the React ListView component</h3>,
  <ListView />,
  document.getElementById('js-framework')
);
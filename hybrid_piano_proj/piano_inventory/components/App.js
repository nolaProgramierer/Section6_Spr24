import React from 'react';
// Imported components
import ListView from './listView';

// Main component
const App = () => {
   return (
    <div style={containerStyle}>
        <ListView />
    </div>
    
   )
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "30px"
}

export default App;
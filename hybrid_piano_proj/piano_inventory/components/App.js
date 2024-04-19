import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Imported components
import ListView from './listView';
import Details from './Details';

// Main component
const App = () => {
   return (
    <Router>
        <Routes>
            <Route path ="/index_inventory" element={<ListView/>} />
            <Route path ="/piano_details/:id" element={<Details/>} />
       </Routes>
    </Router>
    
    
    // <div style={containerStyle}>
    //     <ListView />
    // </div>
    
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
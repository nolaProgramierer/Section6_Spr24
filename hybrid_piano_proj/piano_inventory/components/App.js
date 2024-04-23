import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Imported components
import ListView from './listView';
import Details from './Details';
import AddPianoForm from './AddPianoForm';
import EditPiano from './EditPiano';


// Main component
const App = () => {

const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

console.log("Fetching pianos")
const url = `http://127.0.0.1:8000/api/pianos/`

// After component loads retrieve data from Django end point
useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    fetchData();
    }, []);

    // Render loading state if data is still loading
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Render error state if there was an error
    if (error) {
        return <div>Error: {error}</div>;
    }

   return (
    <Router>
        <Routes>
            {/* Display list of all pianos */}
            <Route path ="/index_inventory" element={<ListView data={data}/>} />
            
            {/* Pass data to Details component only when data is available */}
            {data && <Route path="/piano_details/:id" element={<Details data={data} url={url}/>} />}

            {/* Add a piano */}
            <Route path ="/piano_list" element={<AddPianoForm apiUrl={url}/>} />

            {/* Edit a piano */}
            <Route path="/edit_piano/:id" element={<EditPiano data={data} apiUrl={url}/>} />

            {/* Delete a piano */}
            {/* <Route path="/delete_piano/:id" element={<DeletePiano data={data} apiUrl={url}/>} /> */}

       </Routes>
    </Router>
    
    
   )
}

export default App;
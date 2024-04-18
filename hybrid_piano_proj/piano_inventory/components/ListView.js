import React, { useState, useEffect } from 'react';

const ListView = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Fetching pianos")
    const url = `http://127.0.0.1:8000/api/pianos/`

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
    
    // Render messages
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      
    // Render the page
    return (
       <div style={listStyle}>
            <h3>This is the Piano List view</h3>
            <ul>
                {data.map((item, index) => (
                <li key={index}>{item.brand}</li>
                ))}
            </ul> 
       </div>   
    )
}

const listStyle = {
    fontSize: "30px",
}

export default ListView;
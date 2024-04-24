// Details
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Details = (props) => {
    // URL for the API endpoint 
    const { url } = props;
    // ID from the URL 
    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the component mounts or when the ID changes
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${url}${id}/`); // Fetch the specific item
                if (!response.ok) {
                    throw new Error('Failed to fetch item');
                }
                const data = await response.json();
                console.log(data);
                setSelectedItem(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        // Trigger the data refresh
        fetchData();
        // Dependency array
    }, [url, id]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!selectedItem) {
        return <div>Item not found</div>;
    }

    return (
        <div style={detailPageStyle}>
            <div style={detailStyle}>
                <h2>Details of {selectedItem.brand}</h2>
                <p>Price: ${selectedItem.price}</p>
                <p>Piano size in cm: {selectedItem.size}</p>
                <p>Owner: {selectedItem.owner_detail.username}</p>
                <motion.div>
                    <motion.img    
                        src={selectedItem.imageUrl} 
                        alt={selectedItem.brand} 
                        style={imageStyle}
                        whileHover={{ scale: 1.05 }}
                        onHoverStart={e => {}}
                        onHoverEnd={e => {}}
                    >
                    </motion.img>
                </motion.div>
            </div>

            {/* If Django user is the same as the piano owner render button */}
            {selectedItem.owner === selectedItem.current_user_id ?  <Link to={`/edit_piano/${id}`}>Edit this piano</Link> : null}
        
            <Link to={`/index_inventory`}>Back to Piano Inventory</Link>
        </div>
    );
};

const detailPageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '28px 0px',
};

const detailStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    padding: '32px 32px',
    width: '50%',
    border: '1px solid black',
};

const imageStyle = {
    height: '304px',
    boxShadow: '12px 12px 8px #808080',
};

export default Details;


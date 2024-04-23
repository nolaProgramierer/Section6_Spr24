import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditPiano = (props)=> {
    const { apiUrl, data } = props;

    // Initialize useNavigate
    const navigate = useNavigate();

    // Retrieve parameter 
    const { id } = useParams();
    const selectedItem = data.find(item => item.id === parseInt(id));

    // Piano object state
    const [piano, setPiano] = useState({
        brand: selectedItem.brand,
        price: selectedItem.price,
        size: selectedItem.size,
        imageUrl: selectedItem.imageUrl,
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        // Extract 'name' and 'value' from the event object
        const { name, value } = e.target;
        setPiano((prevPiano) => ({
            // Spreads the previous state
            ...prevPiano,
            // Updates the state with new value
            // Key is a computed property name
            [name]: value,        
        }));
        console.log(piano);
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                // Converts state variable to JSON
                body: JSON.stringify(piano),
            });

            if (!response.ok) {
                throw new Error("Failed to submit the form");
            }
            // Clear form
            setPiano({ brand: "", size: "", price: "", imageUrl: ""});
            setSuccess(true);
            setError(null);

            // Navigate to piano's detail page
            // navigate(`/piano_details/${id}`)
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };


    // Handle delete
    // const handleDelete = async () => {
    //     try {
    //         const response = await fetch(`${url}${id}`, {
    //             method: "DELETE "
    //         });
    //     }
    // }
    return (
        <div>
            <h3>Edit an existing piano</h3>
            {error && <p>{error}</p>}
            {success && <p>Piano added successfuly!</p>}

            <form style={formStyle} onSubmit={handleSubmit}>
                <div style={formDivStyle}>
                    <label>Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={piano.brand}
                        onChange={handleChange}
                        required
                        style={formInputStyle}
                    />
                </div>
                <div style={formDivStyle}>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={piano.price}
                        onChange={handleChange}
                        required
                        style={formInputStyle}
                    />
                </div>
                <div style={formDivStyle}>
                    <label>Size:</label>
                    <input
                        type="number"
                        name="size"
                        value={piano.size}
                        onChange={handleChange}
                        required
                        style={formInputStyle}
                    />
                </div>
                <div style={formDivStyle}>
                    <label>ImageURL:</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={piano.imageUrl}
                        onChange={handleChange}
                        style={formInputStyle}
                    />
                </div>
                <button type="submit">Update piano</button>
            </form>
            <Link to={`/index_inventory`}>Back to Piano Inventory</Link>
        </div>
    )
}
const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}
const formDivStyle = {
    display: "flex",
    width: "48%",
    justifyContent: "space-between",
}
const formInputStyle = {
    width: "60%",
}

export default EditPiano;
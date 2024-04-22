import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const EditPiano = (props)=> {
    const { apiUrl, data } = props;

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
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };
    return (
        <div>
            <h3>Edit an existing piano</h3>
            {error && <p>{error}</p>}
            {success && <p>Piano added successfuly!</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={piano.brand}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={piano.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Size:</label>
                    <input
                        type="number"
                        name="size"
                        value={piano.size}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>ImageURL:</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={piano.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update piano</button>
            </form>
            
        </div>
    )
}

export default EditPiano;
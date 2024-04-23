import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddPianoForm = (props)=> {
    const { apiUrl, onPianoAdded } = props;
    const navigate = useNavigate();
    // Piano object state
    const [piano, setPiano] = useState({
        brand: '',
        price: '',
        size: '',
        imageUrl: '',
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
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Converts state variable to JSON
                body: JSON.stringify(piano),
            });

            if (response.ok) {
                // Clear form
                setPiano({ brand: "", size: "", price: "", imageUrl: ""});
                setSuccess(true);
                setError(null);
                // fetchUpdatedPianos();
                // navigate("/index_inventory");
                if (onPianoAdded) {
                    // Refresh the parent component
                    onPianoAdded();
                }     
            } else {
                throw new Error("Failed to add piano");
            }  
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };

    // Fetch updated data
    const fetchUpdatedPianos = async () => {
        const response = await fetch(apiUrl);
        const jsonData = await response.json()
        setPiano(jsonData);
    }


    return (
        <div>
            <h3>Add a new piano</h3>
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
                <button type="submit">Add Piano</button>
            </form>
            <Link to={`/index_inventory`}>Back to Piano Inventory</Link>
        </div>
    )
}

export default AddPianoForm;
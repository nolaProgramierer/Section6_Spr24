import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI style imports
import {Button,
        FormControl,
        Input,
        InputLabel,
        } from '@mui/material';

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
        <div style={formContainer}>
            <h3>Add a new piano</h3>
            {error && <p>{error}</p>}
            {success && <p>Piano added successfuly!</p>}

            <form style={muiFormStyle} onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="form-brand">Brand</InputLabel>
                    <Input 
                        type="text"
                        name="brand"
                        value={piano.brand}
                        onChange={handleChange}
                        id="form-brand" 
                        aria-describedby="piano-brand" 
                    />
                </FormControl> 
                
                <FormControl>
                    <InputLabel htmlFor="form-price">Price</InputLabel>
                    <Input 
                        type="number"
                        name="price"
                        value={piano.price}
                        onChange={handleChange}
                        id="form-price" 
                        aria-describedby="piano-price" 
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="form-size">Size</InputLabel>
                    <Input 
                        type="number"
                        name="size"
                        value={piano.size}
                        onChange={handleChange}
                        id="form-size" 
                        aria-describedby="piano-size" 
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="form-url">Image URL</InputLabel>
                    <Input 
                        type="url"
                        name="imageUrl"
                        value={piano.imageUrl}
                        onChange={handleChange}
                        id="form-url" 
                        aria-describedby="piano-image-url" 
                    />
                </FormControl>
                <Button style={muiBtn} type="submit" variant="contained">Add New Piano</Button>
            </form>
            <Link to={`/index_inventory`}>Back to Piano Inventory</Link>
        </div>   
    )
}

const formContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}
const muiFormStyle = {
    display: "flex",
    flexDirection: "column",
    height: "360px",
    width: "60%",
    justifyContent: "space-between",
}
const muiBtn = {
    margin: "20px 0px",
}
export default AddPianoForm;
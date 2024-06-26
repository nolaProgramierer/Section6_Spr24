import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// MUI style imports
import {Button,
    FormControl,
    Input,
    InputLabel,
    } from '@mui/material';

const EditPiano = (props)=> {
    const { apiUrl, onDelete, onPianoAdded } = props;

    // Initialize useNavigate
    const navigate = useNavigate();

    // Retrieve parameter 
    const { id } = useParams();
    // State variables
    const [piano, setPiano] = useState(null)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    useEffect(() => {
        const fetchPiano = async () => {
            try{
                const response = await fetch(`${apiUrl}${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch the piano")
                }
                const data = await response.json();
                setPiano(data);
            } catch (err) {
                setError(err.message)
            }
        };
        fetchPiano();
    }, [apiUrl, id]);

    
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

    const handleDelete = async () => {
        try {
            await onDelete(id);
            if (onPianoAdded) {
                onPianoAdded()
            } 
            navigate("/index_inventory");
        } catch (err) {
            console.error("Error deleting the piano:", err.message)
        }
    }

    // Fallback to avoid null access
    if (!piano) {
        return <div>Loading...</div>;
      }

    return (
        <div style={formContainer}>
            <h3>Edit an existing piano</h3>
            {error && <p>{error}</p>}
            {success && <p>Piano edited successfully!</p>}

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
                <Button style={muiSubmitBtn} type="submit" variant="contained">Edit Piano</Button>
            </form>

            <Button color="warning" type="submit" onClick={handleDelete} variant="contained">Delete Piano</Button>
            
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
const muiSubmitBtn = {
    margin: "20px 0px",
}

export default EditPiano;
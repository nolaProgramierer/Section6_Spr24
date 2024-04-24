// MUI style imports
import {Button,
    FormControl,
    Input,
    InputLabel,
    } from '@mui/material';

const PianoForm = () => {
    return (
        <div style={muiFormStyle}>
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
        </div>
    )
}

export default PianoForm;

const muiFormStyle = {
    display: "flex",
    flexDirection: "column",
    height: "360px",
    width: "60%",
    justifyContent: "space-between",
}
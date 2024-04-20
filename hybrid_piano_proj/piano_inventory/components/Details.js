// Details.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Details = (props) => {
    const { data } = props;
    // Retrieve parameter 
    const { id } = useParams();
    const selectedItem = data.find(item => item.id === parseInt(id));

    if (!selectedItem) {
        return <div>Item not found</div>;
    }

    return (
        <div style={detailPageStyle}>
            <div style={detailStyle}>
                <h2>Details of {selectedItem.brand}</h2>
                <p>Price: {selectedItem.price}</p>
                <p>Piano size in cm: {selectedItem.size}</p>
                <p><img src={selectedItem.imageUrl} alt={selectedItem.brand} piano style={imageStyle}></img></p>
            </div>  
        </div>
    );
};
const detailPageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}
const detailStyle = {
    border: "1px solid black",
    padding: "30px",
}
const imageStyle = {
    height: "300px",
    boxShadow: "5px 10px #888888", 
}
export default Details;

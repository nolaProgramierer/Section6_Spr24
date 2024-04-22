// Details.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Details = (props) => {
    const { data } = props;
    // Retrieve parameter 
    const { id } = useParams();
    const selectedItem = data.find(item => item.id === parseInt(id));

    useEffect(() => {
        console.log(data);
    })

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
                <p><img src={selectedItem.imageUrl} alt={selectedItem.brand} piano style={imageStyle}></img></p>
            </div>
            <Link to={`/edit_piano/${id}`}>Edit this piano</Link>
            <Link to={`/index_inventory`}>Back to Piano Inventory</Link>      
        </div>
    );
};
const detailPageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "28px 0px",
}
const detailStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyItems: "space-between",
    padding: "32px 32px",
    width: "50%",
    border: "1px solid black",
}
const imageStyle = {
    height: "304px",
    boxShadow: "12px 12px 8px #808080", 
}

export default Details;

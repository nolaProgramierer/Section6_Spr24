import React from 'react';
import { Link } from 'react-router-dom';

const ListView = (props) => {
    const { data } = props;

    // Render the page
    return (
       <div style={listStyle}>
            <h3>This is the Piano List view</h3>
            <ul>
                {data && data.map((item, index) => (
                <li key={index}>
                    <Link to={`/piano_details/${item.id}`}>{item.brand}</Link>
                </li>
                ))}
            </ul> 
       </div>   
    )
}

const listStyle = {
    fontSize: "30px",
}

export default ListView;
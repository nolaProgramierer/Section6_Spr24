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
            
            <a style={linkStyle} href="/add_piano">Add a piano(sync)</a><br />
            <Link style={linkStyle} to={'/piano_list'}>Add a piano(async)</Link>
       </div>   
    )
}

const listStyle = {
    fontSize: "1.5em",
}
const linkStyle = {
    fontSize: ".75em",
    color: "gray",
}

export default ListView;
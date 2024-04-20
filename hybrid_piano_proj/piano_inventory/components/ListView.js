import React from 'react';
import { Link } from 'react-router-dom';

import AddPianoForm from './AddPianoForm';

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
            <a href="/add_piano">Add a piano(sync)</a><br />
            {/* <Link to={'/add_piano'}>Add a piano(sync)</Link> */}
            <Link to={'/piano_list'}>Add a piano(async)</Link>
       </div>   
    )
}

const listStyle = {
    fontSize: "30px",
}

export default ListView;
import React from 'react';
import { Link } from 'react-router-dom';

const ListView = (props) => {
    const { data } = props;

    return (
       <div style={containerStyle}>
            <h3>This is the Piano List view</h3>
            <div>
                <ul style={listStyle}>
                    {data && data.map((item, index) => (
                    <li style={listItemStyle} key={index}>
                        <Link to={`/piano_details/${item.id}`}>{item.brand}</Link>
                        <img src={item.imageUrl} alt="piano" style={imgStyle}></img>
                    </li>
                    ))}
                </ul>
            </div>
            <div style={linkStyle}>
                <a  style={linkItemStyle} href="/add_piano">Add a piano(sync)</a>
                <Link  style={linkItemStyle} to={'/piano_list'}>Add a piano(async)</Link>
            </div>
            
       </div>   
    )
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
}
const linkStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    padding: "20px",
    color: "#696969"
}
const linkItemStyle = {
    color: "#a9a9a9",
}
const listStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
}
const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    width: "100%",
}
const imgStyle = {
    boxShadow: "12px 12px 8px #808080",
    width: "150px",
}

export default ListView;
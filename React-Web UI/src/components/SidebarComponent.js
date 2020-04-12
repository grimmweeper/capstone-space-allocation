import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar()
{
    return(
        <div class="sidenav">
            <Link class="sideclick" to="/home">Home</Link>
            <Link class="sideclick" to="/floorplan">Map</Link>
            <Link class="sideclick" to="/upload">Upload</Link>
            <Link class="sideclick" to="/retrieve">Retrieve</Link>
            <Link class="sideclick" to="#">Allocate</Link>
            <Link class="sideclick" to="#">Save</Link>
            <Link class="sideclick" to="/login">Sign Out</Link>
        </div>
    );
}

export default Sidebar;
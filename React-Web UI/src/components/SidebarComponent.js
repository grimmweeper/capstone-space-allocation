import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props)
{
    return(
        <div class="sidenav">
            <Link class="sideclick" to="/home">Home</Link>
            <Link class="sideclick" to="/floorplan">Map</Link>
            <Link class="sideclick" to="/upload">Upload</Link>
            <Link class="sideclick" to="/retreive">Retreive</Link>
            <Link class="sideclick" to="#">Allocate</Link>
            <Link class="sideclick" to="#">Save</Link>
            <Link class="sideclick" to="#">Sign Out</Link>
        </div>
    );
}

export default Sidebar;
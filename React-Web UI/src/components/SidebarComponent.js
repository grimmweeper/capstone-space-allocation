import React from 'react';
import { history } from '../helper/history';


let allocateSquares = () => {
    if (window.location.pathname === "/login" || window.location.pathname === "/register"){
        console.log("Login first.");
    }
    else {
        fetch('http://localhost:3001/allocateSquares')
        .then(response => {
            if (response.ok) {
                //success alert message
                alert('Projects allocated');
                if (window.location.pathname === "/floorplan"){
                    window.location.reload(false);
                }
                else {
                    history.push('/floorplan');
                }
                         
                return response;
            }
            else {
                //error alert message
                alert('GET FAILED');
                response = [];
            }
        })
        .then(response => {
            var data = response.json();
            //this.setState({data:data});
            console.log("state", data);
        })
    }

}   

let clearSquares = () => {
    if (window.location.pathname === "/login" || window.location.pathname === "/register"){
        console.log("Login first.");
    }
    else {
        fetch('http://localhost:3001/clearSquares')
        .then(response => {
            if (response.ok) {
                //success alert message
                alert('Cleared allocation.');
                if (window.location.pathname === "/floorplan"){
                    window.location.reload(false);
                }
                else {
                    history.push('/floorplan');
                }
                return response;
            }
            else {
                //error alert message
                alert('GET FAILED');
                response = [];
            }
        })
        .then(response => {
            var data = response.json();
            //this.setState({data:data});
            console.log("state", data);
        })
    }

}

let goHome = () => {
    history.push('/home');
}

let goMap = () => {
    history.push('/floorplan');
}

let goUpload = () => {
    history.push('/upload');
}

let goOut = () => {
    history.push('/login');
}

function Sidebar()
{
    return(
        <div className="sidenav">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <button title='Home' type = "submit" className="sidebutton" onClick = { goHome }><i className="fa fa-home"></i></button>
            <button title='Map' type = "submit" className="sidebutton" onClick = { goMap }><i className="fa fa-map"></i></button>
            <button title='Upload CSV' type = "submit" className="sidebutton" onClick = { goUpload }><i className="fa fa-upload"></i></button>
            <button title='Allocate' type ="submit"className="sidebutton" onClick = { allocateSquares }><i className="fa fa-clone"></i></button>
            <button title='Clear' type = "submit" className="sidebutton" onClick = { clearSquares }><i className="fa fa-trash"></i></button>
            <button title='Save' className="sidebutton"><i className="fa fa-save"></i></button>
            <button title='Login' type = "submit" className="sidebutton" onClick = { goOut }><i className="fa fa-sign-out"></i></button>
        </div>
    );
}

export default Sidebar;
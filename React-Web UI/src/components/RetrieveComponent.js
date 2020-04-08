import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button } from 'reactstrap';


class Retrieve extends Component {

    constructor(props) {
        super(props);
        this.state = {data:[]};
    }

    getDB = () => {
        fetch('http://localhost:3001/get')
        .then(response => {
            if (response.ok) {
                //success alert message
                alert('GET SUCCESS');
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
            this.setState({data:data});
            console.log("state", this.state.data);
        })
    }


    getSquares = () => {
        fetch('http://localhost:3001/getSquares')
        .then(response => {
            if (response.ok) {
                //success alert message
                alert('GET SUCCESS');
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
            this.setState({data:data});
            console.log("state", this.state.data);
        })
    }    

    clearSquares = () => {
        fetch('http://localhost:3001/clearSquares')
        .then(response => {
            if (response.ok) {
                //success alert message
                alert('GET SUCCESS');
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
            this.setState({data:data});
            console.log("state", this.state.data);
        })
    }  
    
    allocateSquares = () => {
        fetch('http://localhost:3001/allocateSquares')
        .then(response => {
            if (response.ok) {
                //success alert message
                alert('GET SUCCESS');
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
            this.setState({data:data});
            console.log("state", this.state.data);
        })
    }      

    render() {
        return(
            <div className="container">
                <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" color="primary" onClick = { this.getDB }>
                        Retrieve
                        </Button>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" color="primary" onClick = { this.getSquares }>
                        Get Squares
                        </Button>
                    </Col>
                </Row>                
                <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" color="primary" onClick = { this.clearSquares }>
                        Clear Squares
                        </Button>
                    </Col>
                </Row> 
                <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" color="primary" onClick = { this.allocateSquares }>
                        Allocate Squares
                        </Button>
                    </Col>
                </Row>                                 
            </div>
            
        );
    }

}

export default Retrieve;
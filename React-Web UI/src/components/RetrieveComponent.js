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


    getHexagons = () => {
        fetch('http://localhost:3001/getHexagons')
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

    clearHexagons = () => {
        fetch('http://localhost:3001/clearHexagons')
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
    
    allocateHexagons = () => {
        fetch('http://localhost:3001/allocateHexagons')
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
                        <Button type="submit" color="primary" onClick = { this.getHexagons }>
                        Get Hexagons
                        </Button>
                    </Col>
                </Row>                
                <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" color="primary" onClick = { this.clearHexagons }>
                        Clear Hexagons
                        </Button>
                    </Col>
                </Row> 
                {/* <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" color="primary" onClick = { this.allocateHexagons }>
                        Allocate Hexagons
                        </Button>
                    </Col>
                </Row>                                  */}
            </div>
            
        );
    }

}

export default Retrieve;
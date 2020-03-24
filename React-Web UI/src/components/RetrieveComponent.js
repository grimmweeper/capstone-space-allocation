import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button } from 'reactstrap';


class Retrieve extends Component {

    constructor(props) {
        super(props);
        this.state = {data:[]};
    }

    getDB = () => {
        fetch('http://localhost:3001/crud')
        .then(results => {
            var data = results.json();
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
            </div>
        );
    }

}

export default Retrieve;
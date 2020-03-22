import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import { Breadcrumb, BreadcrumbItem, Row, Col, Button } from 'reactstrap';

const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase()
  };


class Upload extends Component {
    
    constructor(props) {
        super(props);
        this.state = {data:[]};
    }

    uploadCSV = data => {

        //var data_json = JSON.stringify(data);
        var data_json = data;
    
        console.log(data_json);
        this.setState({data: data_json});
    }

    postCSV = () => {

        console.log(this.state.data[0]);
        fetch('http://localhost:3001/crud', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     first: 'lala',
            //     last: 'land',
            //     email: 'hello me',
            //     phone: 75844,
            //     location:"here",
            //     hobby:"nothing :)"
            // })
            body: JSON.stringify(this.state.data[0])
        })
    }

    render() {
        return(
            <div className="container">
                <CSVReader
                    cssClass="react-csv-input"
                    label="Upload CSV with requirement details"
                    onFileLoaded={this.uploadCSV}
                    parserOptions={papaparseOptions}
                />
                <Row className="form-group">
                    <Col md={{size:10}}>
                        <Button type="submit" color="primary" onClick = { this.postCSV }>
                        Upload
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
    

    
}


export default Upload;
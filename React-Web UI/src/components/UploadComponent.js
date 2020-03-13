import React from "react";
import CSVReader from "react-csv-reader";
import { Breadcrumb, BreadcrumbItem, Row, Col, Button } from 'reactstrap';

var uploadCSV = (data) => {

    var data_json = JSON.stringify(data);

    console.log(data_json);
    return data_json;
}

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase()
};

function postCSV() {
    fetch('http://localhost:3001/crud', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first: 'lala',
            last: 'land',
            email: 'hello me',
            phone: 75844,
            location:"here",
            hobby:"motherfucker"
        })
    })
}


function Upload(props) {
    return(
        <div className="container">
            <CSVReader
                cssClass="react-csv-input"
                label="Upload CSV with requirement details"
                onFileLoaded={uploadCSV}
                parserOptions={papaparseOptions}
            />
            <Row className="form-group">
                <Col md={{size:10}}>
                    <Button type="submit" color="primary" onClick = { postCSV }>
                    Upload
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Upload;
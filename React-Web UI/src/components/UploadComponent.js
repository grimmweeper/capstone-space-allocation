import React from "react";
import CSVReader from "react-csv-reader";
import { Breadcrumb, BreadcrumbItem, Row, Col, Button } from 'reactstrap';

const projectDetails = (data, fileName) => console.log(data, fileName);

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase()
};


function Upload(props) {
    return(
        <div className="container">
            <CSVReader
                cssClass="react-csv-input"
                label="Upload CSV with requirement details"
                onFileLoaded={projectDetails}
                parserOptions={papaparseOptions}
            />
            <Row className="form-group">
                <Col md={{size:10}}>
                    <Button type="submit" color="primary">
                    Upload
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Upload;
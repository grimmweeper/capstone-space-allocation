import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import { Row, Col, Button } from 'reactstrap';


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

        console.log(JSON.stringify(this.state.data));
        fetch('http://localhost:3001/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.data)
        }).then(response => {
            if (response.ok) {
                //success alert message
                alert('Upload is successful.');
            }
            else {
                //error alert message
                alert('POST FAILED');
            }

        })
    }

    render() {
        return(
            <div className="container">
                <div className = "boxdiv">
                    <div className="col-md-6 col-md-offset-3">
                        <h3>Upload CSV</h3>
                        <br></br>
                        <CSVReader
                            cssClass="react-csv-input"
                            onFileLoaded={this.uploadCSV}
                            parserOptions={papaparseOptions}
                            inputStyle={{color: 'black'}}
                        />
                        <br></br>
                        <Row className="form-group">
                                <Button id = "uploadBtn" type="submit" color="primary" onClick = { this.postCSV }>
                                Upload
                                </Button>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
    

    
}


export default Upload;
import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
// const passwordsMatch = ({ password, cfmpassword }) => {
//     return password === cfmpassword;
//   };

class Signup extends Component {

    constructor(props) {
        super(props);


        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }
        


    render() {

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Signup</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Sign Up</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                   <div className="col-12">
                      <h3>Create Your Account</h3>
                   </div>
                   <div className="col-12 col-md-9">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="Username" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="Username"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(5), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: ' Must be greater than 5 characters ',
                                            maxLength: ' Must be 15 characters or less '
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={{size: 4}}>
                                <Control.text model=".password" id="password" name="password" type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(5), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: ' Must be greater than 5 characters ',
                                            maxLength: ' Must be 15 characters or less ',
                                        }}
                                     />
                                </Col>
                                <Label htmlFor="cfmpassword" md={2}>Confirm Password</Label>
                                <Col md={{size: 4}}>
                                <Control.text model=".cfmpassword" id="cfmpassword" name="cfmpassword" type="password"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(5), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".cfmpassword"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: ' Must be greater than 5 characters ',
                                            maxLength: ' Must be 15 characters or less ',
                                            passwordsMatch: ' Password do not match '
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(8), maxLength: maxLength(8), isNumber
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            minLength: ' Must contain 8 digits',
                                            maxLength: ' Must contain 8 digits ',
                                            isNumber: ' Must be a number '
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: ' Required ',
                                            validEmail: ' Invalid Email Address '
                                        }}
                                     />
                                </Col>
                            </Row>
                        </LocalForm>
                        <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Create Account
                                    </Button>
                                </Col>
                            </Row>
                    </div>
               </div>

            </div>
        );
    }
    
}

export default Signup;
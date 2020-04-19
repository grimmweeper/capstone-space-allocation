import React, { Component } from 'react';
import Signup from './SignupComponent';
import Floorplan from './FloorplanComponent';
import Upload from './UploadComponent';
import Retrieve from './RetrieveComponent';
import HomePage  from './HomeComponent';
import Sidebar from './SidebarComponent';

import { LoginPage } from './LoginComponent';
import { RegisterPage } from './RegisterComponent';
import { PrivateRoute } from './PrivateRouteComponent';
import { alertActions } from '../redux/AlertActionCreator';

import { Switch, Route, Redirect, withRouter, Router } from 'react-router-dom'
import { connect } from 'react-redux';




class Main extends Component {

  constructor(props) {
    super(props);


  }

  

  render() {

    const { alert } = this.props;

    return (
      <div>
        <Sidebar/>
        <div>
          <Switch>

            <PrivateRoute exact path='/signup' component={Signup} />} />
            <PrivateRoute exact path='/floorplan' component={Floorplan} />} />
            <PrivateRoute exact path='/upload' component={Upload} />} />
            <PrivateRoute exact path='/retrieve' component={Retrieve} />} />
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />

          </Switch>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default withRouter(connect(mapState, actionCreators)(Main));
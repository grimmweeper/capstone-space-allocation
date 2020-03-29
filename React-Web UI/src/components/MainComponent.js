import React, { Component } from 'react';
import Header from './HeaderComponent';
import Signup from './SignupComponent';
import Floorplan from './FloorplanComponent';
import Upload from './UploadComponent';
import Retrieve from './RetrieveComponent';

//weepz
import { HomePage } from './HomeComponent';
import { LoginPage } from './LoginComponent';
import { RegisterPage } from './RegisterComponent';
import { history } from '../helper/history';
import { PrivateRoute } from './PrivateRouteComponent';
import { alertActions } from '../redux/AlertActionCreator';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';



class Main extends Component {

  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
  });
  }

  

  render() {

    const { alert } = this.props;

    return (
      <div>
        <Header />
        <div>
          <Switch>

              {/* <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />} /> */}
               {/* <Route exact path='/signup' component={() => <Signup resetSignupForm={this.props.resetSignupForm} />} /> */}
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
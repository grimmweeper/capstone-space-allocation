import React, { Component } from 'react';
import Home from './HomeComponent';
import Signup from './SignupComponent';
import Floorplan from './FloorplanComponent';
import Upload from './UploadComponent';
import Retrieve from './RetrieveComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import Sidebar from './SidebarComponent';

const mapDispatchToProps = dispatch => ({
  resetSignupForm: () => { dispatch(actions.reset('signup'))}
});

const mapStateToProps = state => {
  return {

  }
}

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return(
          <Home 
          />
      );
    }


    return (
      <div>
        <Sidebar/>
        <div>
          <Switch>
              <Route path='/home' component={HomePage} />
              {/* <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />} /> */}
               {/* <Route exact path='/signup' component={() => <Signup resetSignupForm={this.props.resetSignupForm} />} /> */}
               <Route exact path='/signup' component={Signup} />} />
               <Route exact path='/floorplan' component={Floorplan} />} />
               <Route exact path='/upload' component={Upload} />} />
               <Route exact path='/retrieve' component={Retrieve} />} />
              <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
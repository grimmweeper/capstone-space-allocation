import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter, Router } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { history } from './helper/history';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
  
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
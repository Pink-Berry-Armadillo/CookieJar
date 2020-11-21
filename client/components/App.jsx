import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import MainCookieContainer from './MainCookieContainer';
import loginPage from './loginPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={loginPage} />
          <Route exact path="/authenticated" component={MainCookieContainer} />
          {/* <Route exact path="/" component={MainCookieContainer} /> */}
          <Route exact path="/login" component={loginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

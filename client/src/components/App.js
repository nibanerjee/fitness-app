import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import AppHeader from './AppHeader';
import Home from './Home';
import BMICalculator from './BMICalculator';
import UserForum from './UserForum';
import Events from './Events';
import history from '../history';
import './App.scss';

const App = () => {
    return (
      <div className="fitness-app container-fluid">
        <div className="inner-wrapper">
          <Router history={history}>
            <AppHeader/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/bmicalc" component={BMICalculator}/>
              <Route path="/userforum" component={UserForum}/>
              <Route path="/events" component={Events}/>
            </Switch>
          </Router>
        </div>
      </div>
    );
}

export default App;
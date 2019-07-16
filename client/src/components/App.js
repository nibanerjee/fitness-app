import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import AppHeader from './AppHeader';
import Home from './Home';
import BMICalculator from './BMICalculator';
import Training from './Training';
import Events from './Events';
import history from '../history';
import './App.scss';

const App = () => {
    return (
        <div className="fitness-app container-fluid">
            <Router history={history}>
                <AppHeader/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/bmicalc" component={BMICalculator}/>
                    <Route path="/training" component={Training}/>
                    <Route path="/events" component={Events}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
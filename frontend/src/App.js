import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom';
import Home from './components/Home';
import Registeration from './components/Registeration';

function App() {
    return (
        <div className="App">
            <Router>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/registeration" render={() => <Registeration />} />
            </Router>
        </div>
    );
}

export default App;

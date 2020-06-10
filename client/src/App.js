import React from "react";

import Ancestors from './components/Ancestors';
import Dashboard from './components/Dashboard';
import Map from './components/Map';

import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';


const App = () => {
    return (
          <Switch>
            <Route path="/ancestors">
              <Ancestors />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
          </Switch>
    );
 }

export default App;

import React from "react";

import Ancestors from './components/Ancestors';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import OnboardingOne from './components/Onboarding/onboardingOne';
import OnboardingTwo from './components/Onboarding/onboardingTwo';
import OnboardingThree from './components/Onboarding/onboardingThree';

import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';
import { useObserver } from "mobx-react-lite";

const App = () => {
  return useObserver(() => (
          <Switch>
            <Route path="/onboarding-one">
              <OnboardingOne />
            </Route>
            <Route path="/onboarding-two">
              <OnboardingTwo />
            </Route>
            <Route path="/onboarding-three">
              <OnboardingThree />
            </Route>
            <Route path="/ancestors">
              <Dashboard />
              <Ancestors />
            </Route>
            <Route path="/map">
              <Dashboard />
              <Map />
            </Route>
            <Route path="/">
              <Dashboard />
              <Ancestors />
            </Route>
            {/* <Route exact path="/">
              <Home />
            </Route> */}
          </Switch>
    ));
 }

export default App;

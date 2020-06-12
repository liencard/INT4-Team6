import React from "react";

import { ROUTES } from './consts';
import Ancestors from './components/Ancestors';
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import OnboardingOne from './components/Onboarding/onboardingOne';
import OnboardingTwo from './components/Onboarding/onboardingTwo';
import OnboardingThree from './components/Onboarding/onboardingThree';
import Home from './components/Home';

import { Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';
import { useObserver } from "mobx-react-lite";

const App = () => {
  return useObserver(() => (
          <Switch>
            <Route path={ROUTES.onboardingOne}>
              <OnboardingOne />
            </Route>
            <Route path={ROUTES.onboardingTwo}>
              <OnboardingTwo />
            </Route>
            <Route path={ROUTES.onboardingThree}>
              <OnboardingThree />
            </Route>
            <Route path={ROUTES.ancestors}>
              <Dashboard />
              <Ancestors />
            </Route>
            <Route path={ROUTES.map}>
              <Dashboard />
              <Map />
            </Route>
            <Route path={ROUTES.home}>
              <Home />
            </Route>
            <Route exact path={ROUTES.dashboard}>
              <Dashboard />
              <Ancestors />
            </Route>
            <Route>
                <p>Not found</p>
              </Route>
          </Switch>
    ));
 }

export default App;

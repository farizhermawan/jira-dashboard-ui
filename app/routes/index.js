import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
// ----------- Layout Imports ---------------
import {DefaultNavbar} from '../layout/components/DefaultNavbar';
import {DefaultSidebar} from '../layout/components/DefaultSidebar';

import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

// ----------- Pages Imports ---------------
import Dashboard from './Dashboards';
import Error404 from './Error';
import {Login, Callback} from './Login';
import {ManageAdmin} from "./Configuration/Admin";
import {ManageSprint} from "./Sprint";
import {DetailIssue, ManageIssue} from "./Issue";

// eslint-disable-next-line no-unused-vars
export const RoutedContent = () => {
  return (
    <Switch>
      <Route component={Login} path="/login"/>
      <Route component={Callback} path="/callback"/>

      <PrivateRoute path="/sprint" exact component={ManageSprint}/>
      <PrivateRoute path="/sprint/:sprintId" exact component={ManageIssue}/>
      <PrivateRoute path="/issue/:issueId" exact component={DetailIssue}/>
      <PrivateRoute path="/config/admin" exact component={ManageAdmin}/>

      <Redirect from="/" to="/dashboard" exact/>
      <PrivateRoute path="/dashboard" exact component={Dashboard}/>

      <Route component={Error404} path="/404"/>

      { /*    404    */}
      <Redirect to="/404"/>
    </Switch>
  );
};

//------ Custom Layout Parts --------
export const RoutedNavbars = () => (
  <Switch>
    <Route component={DefaultNavbar} />
  </Switch>
);

export const RoutedSidebars = () => (
  <Switch>
    <Route component={DefaultSidebar} />
  </Switch>
);

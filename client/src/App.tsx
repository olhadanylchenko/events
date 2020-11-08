import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";

import Event from "./pages/Event";
import Home from "./pages/Home";
import Organization from "./pages/Organization";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

import './App.css';

interface AppProps {}

function App({}: AppProps) {
  
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/search" component={Search}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/event" component={Event}></Route>
      <Route exact path="/organization" component={Organization}></Route>
    </Switch>
  );
}

export default App;

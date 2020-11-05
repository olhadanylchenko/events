import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  
  return (
    <Switch>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/login" component={Login}></Route>
    </Switch>
  );
}

export default App;

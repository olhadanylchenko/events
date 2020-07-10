import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./components/Login";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Switch>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/login" component={Login}></Route>
    </Switch>
  );
}

export default App;

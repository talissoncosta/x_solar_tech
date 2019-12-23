import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login  from './pages/Login';
import Main from './pages/Main'

export default function App() {


  return (
    <Router>
        <Switch>
          <Route path="/home">
            <Main />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}
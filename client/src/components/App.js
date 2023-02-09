import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import '../App.css';

function App() {

  return (
    <div className="App">
        <Switch>
          <Route path="/signin" >
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
          <Route path="*">
            <h1>404 not found</h1>
          </Route>
        </Switch>
    </div>
  );
  
}

export default App;

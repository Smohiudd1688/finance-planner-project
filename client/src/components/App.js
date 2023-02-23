import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NavBar from './NavBar';
import Home from '../pages/Home';
import Loading from '../pages/Loading';
import '../App.css';

function App() {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(true);
    fetch("/me").then((res) => {
      if (res.ok) {
         res.json().then((user) => {
            setUser(user)
          });
         } else {
          setIsLogged(false);
         }
      });

  }, []);

  if (!user && isLogged) {
    return <Loading />
  } else if (!user && !isLogged) {
    return <SignIn setIsLogged={setIsLogged} />
  }

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <NavBar />
        <Switch>
          <Route path="/signin" >
            <SignIn setIsLogged={setIsLogged} />
          </Route>
          <Route path="/signup">
            <SignUp setIsLogged={setIsLogged} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <h1>404 not found</h1>
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
  
}

export default App;

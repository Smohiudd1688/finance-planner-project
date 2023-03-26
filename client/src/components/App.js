import React, {useState, useEffect} from 'react';
import { Switch, Route } from "react-router-dom";
import { UserContext } from './UserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from '../pages/Login';
import NavBar from './NavBar';
import Home from '../pages/Home';
import Wanted from '../pages/Wanted';
import Account from '../pages/Account';
import Loading from '../pages/Loading';
import Charts from '../pages/Charts';
import AddBudgetCategory from '../pages/AddBudgetCategory';
import AddWantedItem from '../pages/AddWantedItem';
import '../App.css';

function App() {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [wantedItems, setWantedItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(true);
    fetch("/me").then((res) => {
      if (res.ok) {
         res.json().then((user) => {
            setUser(user);
            setCategories(user.budget_categories);
            setWantedItems(user.wanted_items);
          });
         } else {
          setIsLogged(false);
         }
      });

      fetch(`/tags`).then((res) => {
        if (res.ok) {
           res.json().then((data) => {
              setTags(data);
            });
           }
      });

  }, []);

  if ((!user || user.email === undefined) && isLogged) {
    return <Loading />
  } else if ((!user || user.email === undefined) && !isLogged) {
    return (
      <UserContext.Provider value={{user, setUser}}>
        <Login setIsLogged={setIsLogged} setCategories={setCategories} setWantedItems={setWantedItems} />
      </UserContext.Provider>
    )
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserContext.Provider value={{user: user, setUser: setUser}}>
        <NavBar />
        <Switch>
          <Route path="/account">
            <Account setIsLogged={setIsLogged} />
          </Route>
          <Route path="/wanted">
            <Wanted tags={tags} wantedItems={wantedItems} setWantedItems={setWantedItems} />
          </Route>
          <Route path="/chart">
            <Charts categories={categories} />
          </Route>
          <Route path="/add_category">
            <AddBudgetCategory categories={categories} setCategories={setCategories} />
          </Route>
          <Route path="/add_item">
            <AddWantedItem tags={tags} setTags={setTags} wantedItems={wantedItems} setWantedItems={setWantedItems} />
          </Route>
          <Route path="/">
            <Home categories={categories} setCategories={setCategories} />
          </Route>
          <Route path="">
            <h1>404 not found</h1>
          </Route>
        </Switch>
      </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
  
}

export default App;

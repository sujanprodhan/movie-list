import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

import store from "./store";
import Login from "./components/Login";
import Movies from "./components/Movies";
import reset from "./constants/css/reset";
import DetailsPage from './components/DetailsPage';

import "./css/styles.scss";


const GlobalStyle = createGlobalStyle`${reset}`;

ReactDOM.render(
  <BrowserRouter>
    <Fragment>
      <Provider store={store}>
        {/* <App /> */}
        <div className="container-menu">
          <div className="menu">
            <Link to="/">Login </Link>
            <Link to="/movies">Movie List </Link>

          
          </div>
        </div>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/movies" exact>
            <Movies />
          </Route>


          <Route path="/details/:id" component={DetailsPage}/>
        </Switch>
      </Provider>
      <GlobalStyle />
    </Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);

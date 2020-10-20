import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
//intalled react-router-dom

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          {/* checkout Page */}
          <Route path="/checkout">
            {/* <Header /> */}
            <Checkout />
          </Route>
          {/* Home Page: This is default page */}
          <Route path="/">
            {/* Header
            <Header/> */}
            {/* Home */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

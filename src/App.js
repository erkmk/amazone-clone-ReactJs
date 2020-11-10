import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
//intalled react-router-dom

const promise = loadStripe(
  "pk_test_51Hlmg7FtRSQUe9NkYNhQ3pJ2lPiMzaSUWZ6gktro0qDKMf7aPYAzTOa7zcf7MEAmtRtXnL3jyuKy0oFPBKbb0YL600cP3IYsvq"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER", //pushing loginUser info to data layer for tracking their logging
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          {/* login Page */}
          <Route path="/login">
            <Login />
          </Route>
          {/* checkout Page */}
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            {/* High order function */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          {/* Home Page: This is default page */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

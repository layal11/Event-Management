import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/signup";
import EventsPage from "./Pages/events/events";
import ResponsiveAppBar from "./components/navBar/Navbar";
import Separator from "./components/separator/separator";
import EventPage from "./Pages/singleEvent/singleEvent";
import Profile from "./Pages/profile/profile";
import Connect from "./Pages/connect/connect";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "./store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAction.islogin());
  }, []);
  return (
    <>
      <ResponsiveAppBar />
      <Separator space="20px" />
      <Switch>
        <Route path="/" exact component={Landing} />
        <ProtectedRoute path="/connect" exact component={Connect} />
        <ProtectedRoute path="/profile" exact component={Profile} />
        <ProtectedRoute path="/events" exact component={EventsPage} />
        <ProtectedRoute path="/event" exact component={EventPage} />
        <ProtectedRoute path="/events" exact component={EventsPage} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
      </Switch>
    </>
  );
};

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user.loggedIn;
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
};

export default App;

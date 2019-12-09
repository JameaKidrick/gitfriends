import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { matchPath } from "react-router";

// COMPONENTS
import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/Routes/PrivateRoute";
import UserRoute from "./components/Routes/UserRoute";
import Users from "./components/Users";
import CreateProfile from "./components/CreateProfile/Page1_Create";
import FaveLanguage from "./components/CreateProfile/Page2_FaveLang";
import MyProfile from "./components/MyProfile/MyProfile";
import UserProfile from "./components/UserProfile/UserProfile";
import EditProfile from "./components/MyProfile/EditProfile/EditProfile";

// ACTIONS
import { logoutUser } from "./actions";

function App(props) {
  const [userid, setUserid] = useState(0);
  const loggedIn = useSelector(state => state.loggedIn);
  // console.log(userid, typeof(userid))

  useEffect(() => {
    setUserid(Number(localStorage.getItem("userid")));
  }, []);

  const logOut = () => {
    props.logoutUser();
  };

  // CURRENT ISSUES:
  // GETTING 0 ON INITIAL RENDER OF MYPROFILE PAGE, IF I TURN THE USERID INTO A NUMBER USING: NUMBER(USERID), I GET NAN. THIS CAUSES THE PAGE TO NOT RENDER AND THROW A 500 ERROR. AFTER A REFRESH, ALL INFORMATION IS SHOWN.
  // GETTING ALL USER PROFILES IS RERENDERING AND ADDING TO THE EXISTING PROFILE LIST INSTEAD OF DOING A REFRESH

  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/users">Find Friends</Link>
        <br />
        <Link to={`/myprofile/${userid}`}>My Profile</Link>
        {!loggedIn && (
          <>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <Link to="/login">Login</Link>
          </>
        )}
        <br />
        {loggedIn && (
          <Link
            to="/"
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </Link>
        )}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route path="/login" component={Login} />

          {/* TEMPORARY - CHANGE TO PRIVATE ROUTE */}

          {/**************************** PRIVATE ROUTES ****************************/}
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute
            exact
            path="/register/:id/createprofile"
            component={CreateProfile}
          />
          <PrivateRoute
            path="/register/:id/createprofile2"
            component={FaveLanguage}
          />
          <UserRoute path="/profile/:id" component={UserProfile} />
          <PrivateRoute
            exact
            path={`/myprofile/:id`}
            {...matchPath(`/myprofile/${userid}`, {
              path: `/myprofile/:id`,
              exact: true,
              strict: false
            })}
            component={MyProfile}
          />
          <PrivateRoute
            path={`/myprofile/:id/editprofile`}
            {...matchPath(`/myprofile/${userid}/editprofile`, {
              path: `/myprofile/:id/editprofile`,
              exact: true,
              strict: false
            })}
            component={EditProfile}
          />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default connect(null, { logoutUser })(App);

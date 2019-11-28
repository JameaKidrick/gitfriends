import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

// COMPONENTS
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ErrorPage from './components/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import Users  from './components/Users';
import CreateProfile from './components/CreateProfile/Page1_Create';
import FaveLanguage from './components/CreateProfile/Page2_FaveLang';
import MyProfile from './components/MyProfile/MyProfile';

// ACTIONS
import { logoutUser } from './actions';

function App(props) {
  const loggedIn = useSelector(state => state.loggedIn)

  const logOut = () => {
    props.logoutUser()
  }

  return (
    <Router>
      <div className='App'>
        <Link to='/'>Home</Link>
        <br />
        <Link to='/users'>Find Friends</Link>
        {!loggedIn && (
          <>
            <br />
            <Link to='/register'>Register</Link>
            <br />
            <Link to='/login'>Login</Link>
          </>
        )}
        <br />
        {loggedIn && (
          <Link to='/' onClick={() => {logOut()}}>Logout</Link>
        )}

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route path='/login' component={Login} />

          {/* TEMPORARY - CHANGE TO PRIVATE ROUTE */}

          {/**************************** PRIVATE ROUTES ****************************/}
          <PrivateRoute path='/users' component={Users} />
          <PrivateRoute exact path='/register/:id/createprofile' component={CreateProfile} />
          <PrivateRoute path='/register/:id/createprofile2' component={FaveLanguage} />
          <PrivateRoute path='/myprofile/:id' component={MyProfile} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default connect(
  null,
  { logoutUser }
)(App);

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
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />

          {/**************************** PRIVATE ROUTES ****************************/}
          <PrivateRoute path='/users' component={Users} />
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

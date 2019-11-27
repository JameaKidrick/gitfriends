import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import Home from './components/Home';
import Register from './components/Register';
import Users  from './components/Users';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

// ACTIONS
import { logoutUser } from './actions';

function App(props) {
  const logOut = () => {
    props.logoutUser()
  }

  return (
    <Router>
      <div className='App'>
        <Link to='/'>Home</Link>
        <br />
        <Link to='/register'>Register</Link>
        <br />
        <Link to='/users'>Find Friends</Link>
        <br />
        <Link to='/login'>Login</Link>
        <br />
        <Link to='/' onClick={() => {logOut()}}>Logout</Link>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />

          {/**************************** PRIVATE ROUTES ****************************/}
          <PrivateRoute exact path='/users' component={Users} />
        </Switch>
      </div>
    </Router>
  )
}

export default connect(
  null,
  { logoutUser }
)(App);

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// COMPONENTS
import Home from './components/Home';
import Register from './components/Register';

function App() {
  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('username')
  }

  return (
    <Router>
      <div className='App'>
        <Link to='/'>Home</Link>
        <br />
        <Link to='/register'>Register</Link>
        <br />
        <Link to='/' onClick={() => {logOut()}}>Logout</Link>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;

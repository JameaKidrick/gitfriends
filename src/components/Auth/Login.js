import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { loginUser } from '../../actions';

const Login = (props) => {
  const isFetching = useSelector(state => state.isFetching)

  const [credentials, setCredentials] = useState({ username: '', pasword: '' })

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]:e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.loginUser(credentials, props.history);
  }

  if(isFetching){
    return(
      <h2>
        Loading...
      </h2>
    )
  }

  return(
    <div>
      Hello LoginPage!
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='username'
          onChange={handleChange}
        />
        <input 
          type='password'
          name='password'
          placeholder='password'
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { loginUser }
)(Login);
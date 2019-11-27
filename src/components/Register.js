import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { registerUser }from '../actions';

const Register = (props) => {
  const isFetching = useSelector(state => state.isFetching)
  const error = useSelector(state => state.error)

  const [credentials, setCredentials] = useState({ username: '', password: '', first_name: '', last_name: '', date_of_birth: '', email: '' })

  const handleChange = e => {
    e.persist();
    setCredentials({ ...credentials, [e.target.name]:e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.registerUser(credentials, props.history)
  }

  if(isFetching){
    return(
      <div>
        <h2>
          Loading...
        </h2>
      </div>
    )
  }

  return(
    <div>
      Hello RegisterPage!
      <br />
      {/* {error&& (
        error
      )} */}
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

        <input 
          type='text'
          name='first_name'
          placeholder='first_name'
          onChange={handleChange}
        />

        <input 
          type='text'
          name='last_name'
          placeholder='last_name'
          onChange={handleChange}
        />

        <input 
          type='text'
          name='date_of_birth'
          placeholder='date_of_birth'
          onChange={handleChange}
        />

        <input 
          type='text'
          name='email'
          placeholder='email'
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { registerUser }
)(Register);
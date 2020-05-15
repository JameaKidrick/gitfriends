import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import useForm from "react-hook-form";

// ACTIONS
import { loginUser } from '../../actions';

// STYLE
import { TextField, FormHelperText, Button } from '@material-ui/core';
import { css } from '@emotion/core';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const override = css`
  display: block;
  margin: 20% auto;
  border-color: red;
`;

const Login = (props) => {
  let { register, handleSubmit, errors, clearError} = useForm();
  const isFetching = useSelector(state => state.isFetching)
  const error = useSelector(state => state.error)

  const [credentials, setCredentials] = useState({})

  const handleChange = e => {
    // return clearError()
  }

  const handleFormSubmit = (data, e) => {
    e.preventDefault();
    props.loginUser(data, props.history);
    if(error){
      setCredentials(data)
    }
  }

  if(isFetching){
    return(
      <ClimbingBoxLoader 
        css={override}
      />
    )
  }

  return(
    <div>
      Hello LoginPage!
      {error && error === 'Invalid credentials' && (
        <FormHelperText error>incorrect username or password</FormHelperText>
      )}
      <br />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          autoFocus
          type='text'
          name='username'
          label='username'
          variant='outlined'
          defaultValue={credentials.username}
          onChange={handleChange}
          inputRef={register({ required:true })}
        />
        {errors.username && errors.username.type === "required" && (
          <FormHelperText error>username is required</FormHelperText>
          )}
        <TextField
          type='password'
          name='password'
          label='password'
          variant='outlined'
          defaultValue={credentials.password}
          onChange={handleChange}
          inputRef={register({ required:true })}
        />
        {errors.password && errors.password.type === "required" && (
          <FormHelperText error>password is required</FormHelperText>
        )}
        <Button type='submit' variant='contained'>Submit</Button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { loginUser }
)(Login);
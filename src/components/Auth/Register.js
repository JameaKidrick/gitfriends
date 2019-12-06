import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import useForm from "react-hook-form";
import { axiosWithAuth } from '../../utils/axiosWithAuth'

// ACTIONS
import { registerUser }from '../../actions';

// STYLE
import { TextField } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';


const Register = (props) => {
  let { register, handleSubmit, errors, clearError, setError } = useForm();
  const isFetching = useSelector(state => state.isFetching);
  const error = useSelector(state => state.error);

  const handleUsernameChange = e => {
    return clearError("username")
  }

  const handleEmailChange = e => {
    return clearError("email")
  }

  // const validateForm= e => {
  //   if(error.error){
  //     setError('username', 'please try again')
  //   }else{
  //     return true
  //   }
  // }

  const handleFormSubmit = (data, e)=> {
    // e.preventDefault()
    // e.persist()
    // validateForm()
    props.registerUser(data, props.history)
    console.log('DATA', data)
  }

  // OPTIMIZING FORM:
    // SHOW USERNAME/EMAIL TAKEN BEFORE SUBMITTING FORM
    // OR
    // SHOW USERNAME/EMAIL TAKEN AFTER SUBMITTING FORM WITHOUT ERASING INFO ALREADY IN FORM

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
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{display:'flex', flexDirection:'column'}}>
        <TextField 
          label='username*'
          name='username'
          onChange={handleUsernameChange}
          variant='outlined'
          inputRef={register({ required:true })}
          />
        {errors.username && errors.username.type === "required" && (
          <FormHelperText error>username is required</FormHelperText>
          )}
        {error.error && error.error === 'Username is already in the database' && (
          <FormHelperText error>this username is already being used</FormHelperText>
        )}

        <TextField
          label='password'
          type='password'
          name='password'
          variant='outlined'
          inputRef={register({ required:true })}
        />
        {errors.password && errors.password.type === "required" && (
          <FormHelperText error>password is required</FormHelperText>
        )}

        <TextField
          label='first name'
          type='text'
          name='first_name'
          variant='outlined'
          inputRef={register({ required:true })}
        />
        {errors.first_name && errors.first_name.type === "required" && (
          <FormHelperText error>first name is required</FormHelperText>
        )}

        <TextField
          label='last name'
          type='text'
          name='last_name'
          variant='outlined'
          inputRef={register({ required:true })}
        />
        {errors.last_name && errors.last_name.type === "required" && (
          <FormHelperText error>last name is required</FormHelperText>
        )}

        <TextField
          label='date of birth'
          type='text'
          name='date_of_birth'
          variant='outlined'
          helperText="format: yyyy-mm-dd"
          inputRef={register({ required:true })}
        />
        {errors.date_of_birth && errors.date_of_birth.type === "required" && (
          <FormHelperText error>date of birth is required</FormHelperText>
        )}

        <TextField
          label='email'
          type='text'
          name='email'
          onChange={handleEmailChange}
          variant='outlined'
          inputRef={register({ required:true })}
          />
          {errors.email && errors.email.type === "required" && (
            <FormHelperText error>email is required</FormHelperText>
          )}
          {error.error && error.error === 'Email is already in the database' && (
            <FormHelperText error>this email is already being used</FormHelperText>
          )}
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { registerUser }
)(Register);
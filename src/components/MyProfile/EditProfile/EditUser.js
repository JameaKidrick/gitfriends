import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import useForm from "react-hook-form";

// ACTIONS
import { editUser, getUser }from '../../../actions';

// STYLE
import { TextField, FormHelperText, Button, Grow } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox'

const EditUser = (props) => {
  let { register, handleSubmit, errors, clearError} = useForm();
  const currentUser = useSelector(state => state.user);
  const isFetching = useSelector(state => state.isFetching);
  const error = useSelector(state => state.error);

  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  const [checkSuccess, setCheckSuccess] = useState();

  useEffect(() => {
    props.getUser();
  }, [])
  
  useEffect(() => {
    setUser({ 
      username:username, 
      password:password, 
      confirmpassword:confirmPassword, 
      first_name:first, 
      last_name:last, 
      email:email
    })
  }, [username, password, confirmPassword, first, last, email])

  // const handleUsernameChange = e => {
  //   return clearError("username")
  // }

  // const handleEmailChange = e => {
  //   return clearError("email")
  // }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
    setCheckSuccess(false)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
    setCheckSuccess(false)
  }

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
    setCheckSuccess(false)
  }

  const handleFirstChange = e => {
    setFirst(e.target.value)
    setCheckSuccess(false)
  }

  const handleLastChange = e => {
    setLast(e.target.value)
    setCheckSuccess(false)
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
    setCheckSuccess(false)
  }

  const handleFormSubmit = (data, e)=> {
    // e.preventDefault()
    // e.persist()
    // validateForm()
    // props.registerUser(data, props.history)
    props.editUser(currentUser.userid, user, setCheckSuccess)
  }

  return(
    <div className='editUserContainer'>
      Hello EditUser Page!
      <Grow direction="left" in={checkSuccess}><FormHelperText style={{color:'limeGreen'}}><CheckBoxIcon /></FormHelperText></Grow>
      <Grow direction="left" in={checkSuccess} {...(checkSuccess ? { timeout: 1500 } : {})}><FormHelperText style={{color:'limeGreen'}}>update successful!</FormHelperText></Grow>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{display:'flex', flexDirection:'column'}}>
        <TextField
          label='username'
          name='username'
          type='text'
          variant='outlined'
          onChange={handleUsernameChange}
        />
        <TextField
          label='new password'
          name='password'
          type='password'
          variant='outlined'
          onChange={handlePasswordChange}
        />
        <TextField
          label='confirm old password'
          name='confirmPassword'
          type='text'
          variant='outlined'
          onChange={handleConfirmPasswordChange}
        />
        <TextField
          label='first name'
          name='first_name'
          type='text'
          variant='outlined'
          onChange={handleFirstChange}
        />
        <TextField
          label='last name'
          name='last_name'
          type='text'
          variant='outlined'
          onChange={handleLastChange}
        />
        <TextField
          label='email'
          name='email'
          type='text'
          variant='outlined'
          onChange={handleEmailChange}
        />
        <Button type='submit' variant='contained'>Submit</Button>
      </form>
    </div>
  )
}

export default connect(null, { 
  editUser,
  getUser
})(EditUser);
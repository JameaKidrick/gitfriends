import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import useForm from "react-hook-form";

// ACTIONS
import { editUser }from '../../../actions';

// STYLE
import { TextField } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';

const EditUser = (props) => {
  let { register, handleSubmit, errors, clearError} = useForm();
  const isFetching = useSelector(state => state.isFetching);
  const error = useSelector(state => state.error);
  const userid = Number(localStorage.getItem('userid'));

  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  
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
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }

  const handleFirstChange = e => {
    setFirst(e.target.value)
  }

  const handleLastChange = e => {
    setLast(e.target.value)
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleFormSubmit = (data, e)=> {
    // e.preventDefault()
    // e.persist()
    // validateForm()
    // props.registerUser(data, props.history)
    console.log('DATA', user)
    props.editUser(userid, user, props.history)
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
    <div className='editUserContainer'>
      Hello EditUser Page!
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
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default connect(null, { 
  editUser
})(EditUser);
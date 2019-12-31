import React, { useState } from 'react';
import 'date-fns';
import { connect, useSelector } from 'react-redux';
import useForm from "react-hook-form";

// ACTIONS
import { registerUser }from '../../actions';

// STYLE
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextField, FormHelperText, Button, makeStyles, Typography } from '@material-ui/core';
import { css } from '@emotion/core';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const useStyles = makeStyles(theme => ({
  input: {
    margin: '1% auto',
    width: '50%'
  }
}));

const override = css`
  display: block;
  margin: 20% auto;
  border-color: red;
`;

const Register = (props) => {
  // STYLE
  const classes = useStyles();

  let { register, handleSubmit, errors, clearError} = useForm();
  const isFetching = useSelector(state => state.isFetching);
  const error = useSelector(state => state.error);

  const [selectedDate, setSelectedDate] = useState();
  const [credentials, setCredentials] = useState({});

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (data, e)=> {
    // e.preventDefault()
    // e.persist()
    // validateForm()
    props.registerUser(data, props.history)
    console.log('DATA', data)
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
      <br />
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{display:'flex', flexDirection:'column'}}>
      <Typography variant='h5'>register</Typography>
      <FormHelperText error>required = *</FormHelperText>
        <TextField 
          label='username*'
          name='username'
          variant='outlined'
          defaultValue={credentials.username}
          inputRef={register({ required:true })}
          className={classes.input}
          />
        {errors.username && errors.username.type === "required" && (
          <FormHelperText error>username is required</FormHelperText>
          )}
        {error.error && error.error === 'Username is already in the database' && (
          <FormHelperText error>this username is already being used</FormHelperText>
        )}

        <TextField
          label='password*'
          type='password'
          name='password'
          variant='outlined'
          defaultValue={credentials.password}
          inputRef={register({ required:true })}
          className={classes.input}
        />
        {errors.password && errors.password.type === "required" && (
          <FormHelperText error>password is required</FormHelperText>
        )}

        <TextField
          label='first name*'
          type='text'
          name='first_name'
          variant='outlined'
          defaultValue={credentials.first_name}
          inputRef={register({ required:true })}
          className={classes.input}
        />
        {errors.first_name && errors.first_name.type === "required" && (
          <FormHelperText error>first name is required</FormHelperText>
        )}

        <TextField
          label='last name*'
          type='text'
          name='last_name'
          variant='outlined'
          defaultValue={credentials.last_name}
          inputRef={register({ required:true })}
          className={classes.input}
        />
        {errors.last_name && errors.last_name.type === "required" && (
          <FormHelperText error>last name is required</FormHelperText>
        )}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            name='date_of_birth'
            inputVariant="outlined"
            format="MM/dd/yyyy"
            label='date of birth*'
            defaultValue={credentials.date_of_birth}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            inputRef={register({ required:true })}
            className={classes.input}
          />
        </MuiPickersUtilsProvider>
        {errors.date_of_birth && errors.date_of_birth.type === "required" && (
          <FormHelperText error>date of birth is required</FormHelperText>
        )}

        <TextField
          label='email*'
          type='text'
          name='email'
          variant='outlined'
          defaultValue={credentials.email}
          inputRef={register({ required:true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
          className={classes.input}
          />
          {errors.email && errors.email.type === "required" && (
            <FormHelperText error>email is required</FormHelperText>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <FormHelperText error>invalid email format</FormHelperText>
          )}
          {error.error && error.error === 'Email is already in the database' && (
            <FormHelperText error>this email is already being used</FormHelperText>
          )}
        <Button type='submit' style={{margin:'0 auto', width:'50%'}}>Submit</Button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { registerUser }
)(Register);
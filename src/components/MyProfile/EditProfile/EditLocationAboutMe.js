import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { getUserProfile, check, editProfile, getUser } from '../../../actions';

// STYLES
import { TextField, Grow, FormHelperText, Button } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox'

const EditLocationAndAboutMe = (props) => {
  const currentUser = useSelector(state => state.user);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [location, setLocation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [updateProfile, setUpdateProfile] = useState();
  const [checkSuccess, setCheckSuccess] = useState();

  useEffect(() => {
    props.check();
    props.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.getUserProfile(currentUser.userid, setProfile, setUser);
  }, [currentUser])

  useEffect(() => {
    setUpdateProfile({location:`${location}`, about_me:`${aboutMe}`})
  }, [location, aboutMe])

  // SETTING INITIAL SETTINGS
  useEffect(() => {
    setLocation(profile.location)
    setAboutMe(profile.about_me)
  }, [profile, user])

  // HANDLE LOCATION
  const handleLocationChange = e => {
    setLocation(e.target.value)
    setCheckSuccess(false)
  }

  // HANDLE ABOUT ME
  const handleAboutMeChange = e => {
    setAboutMe(e.target.value)
    setCheckSuccess(false)
  }
  
  // HANDLE SUBMIT
  const handleSubmit = e => {
    e.preventDefault();
    props.editProfile(currentUser.profileid, updateProfile, setCheckSuccess);
  }

  return(
    <div className='editLocationAndAboutMeContainer'>
      <form onSubmit={handleSubmit}>
        <h2>location</h2>
        <Grow direction="left" in={checkSuccess}><FormHelperText style={{color:'limeGreen'}}><CheckBoxIcon /></FormHelperText></Grow>
        <Grow direction="left" in={checkSuccess} {...(checkSuccess ? { timeout: 1500 } : {})}><FormHelperText style={{color:'limeGreen'}}>update successful!</FormHelperText></Grow>
        <TextField
          label='location'
          variant='outlined'
          onChange={handleLocationChange}
          value={location}
        />
        <h2>about me</h2>
        <TextField
          label='about me'
          variant='outlined'
          multiline
          onChange={handleAboutMeChange}
          value={aboutMe}
        />
        <Button type='submit' variant='contained'>Submit</Button>
      </form>
    </div>
  )
}

export default connect(null, {
  getUserProfile,
  check,
  editProfile,
  getUser
})(EditLocationAndAboutMe);
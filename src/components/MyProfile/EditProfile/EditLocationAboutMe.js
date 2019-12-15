import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { getUserProfile, check, editProfile, getUser } from '../../../actions';

// STYLES
import { TextField } from '@material-ui/core';

const EditLocationAndAboutMe = (props) => {
  const currentUser = useSelector(state => state.user);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [location, setLocation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [updateProfile, setUpdateProfile] = useState();

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
  }

  // HANDLE ABOUT ME
  const handleAboutMeChange = e => {
    setAboutMe(e.target.value)
  }
  
  // HANDLE SUBMIT
  const handleSubmit = e => {
    e.preventDefault();
    props.editProfile(currentUser.profileid, updateProfile, props.history);
  }

  return(
    <div className='editLocationAndAboutMeContainer'>
      <form onSubmit={handleSubmit}>
        <h2>location</h2>
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
        <button type='submit'>Submit</button>
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
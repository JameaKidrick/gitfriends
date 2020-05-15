import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';

// COMPONENTS
import DeleteProfileModal from './DeleteProfile';
import Posts from './Posts';

// ACTIONS
import { getUserProfile, check, getUser, getUserLanguages } from '../../actions';

// STYLE
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 200,
    height: 200,
  },
}));

const MyProfile = (props) => {
  // STYLES
  const classes = useStyles();

  const currentUser = useSelector(state => state.user);
  const userLanguages = useSelector(state => state.userLanguages);
  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([])
  const userid = currentUser.userid;

  useEffect(() => {
    props.check();
    props.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    props.getUserProfile(userid, setProfile, setUser);
    props.getUserLanguages(currentUser.profileid);
  }, [currentUser])

  // console.log('USERLANGUAGES', userLanguages)

  return(
    <div className='myProfileContainer'>
      <Avatar src={profile.avatar} className={classes.bigAvatar}></Avatar>
      <h1>{user.username}</h1>
      {profile.location && (
        <h3>location: {profile.location}</h3>
      )}
      <h3>birthdate: {profile.dob_display}</h3>
      {/* {if()} */}
      {profile.about_me && (
        <h3>about me: {profile.about_me}</h3>
      )}
      <Link to={`/myprofile/${userid}/editprofile`}><Button variant='contained'>edit profile</Button></Link>
      <DeleteProfileModal history={props.history} />
      <br />
      <ul>
        <Typography variant='h6'>favorite languages</Typography>
        {userLanguages.map((item, index) => {
          return(
            <li key={index}>
              {item.language}
            </li>
          )
        })}
      </ul>
      <Posts />
    </div>
  )
}

export default connect(
  null,
  { getUserProfile, check, getUser, getUserLanguages }
)(MyProfile);
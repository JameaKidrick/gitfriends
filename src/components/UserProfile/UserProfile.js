import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux'; 

// STYLE
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

// ACTIONS
import { getUserProfile, check } from '../../actions';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 200,
    height: 200,
  },
}));

const UserProfile = (props) => {
  // STYLES
  const classes = useStyles();

  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    props.getUserProfile(props.match.params.id, setProfile, setUser);
    props.check();
    }, [])

  return(
    <div>
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
    </div>
  )
}

export default connect(
  null,
  { getUserProfile, check }
)(UserProfile);
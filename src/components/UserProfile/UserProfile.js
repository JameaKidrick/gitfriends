import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'; 

// COMPONENTS
import UserPosts from './UserPosts';

// ACTIONS
import { getUserProfile, check } from '../../actions';

// STYLE
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 200,
    height: 200,
  },
}));

const UserProfile = (props) => {
  // STYLES
  const classes = useStyles();

  const userid = props.match.params.id;

  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    props.getUserProfile(userid, setProfile, setUser);
    props.check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <UserPosts userid={userid} />
    </div>
  )
}

export default connect(
  null,
  { getUserProfile, check }
)(UserProfile);
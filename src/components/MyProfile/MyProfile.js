import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';

// COMPONENTS
import DeleteProfileModal from './DeleteProfile';

// ACTIONS
import { getUserProfile, check, getUser } from '../../actions';

// STYLE
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Posts from './Posts';

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
  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([])
  const userid = currentUser.userid;

  useEffect(() => {
    props.check();
    props.getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    props.getUserProfile(userid, setProfile, setUser);

  }, [currentUser])

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
      <Link to={`/myprofile/${userid}/editprofile`}><button>edit profile</button></Link>
      <DeleteProfileModal history={props.history} />
      <br />
      <Posts />
    </div>
  )
}

export default connect(
  null,
  { getUserProfile, check, getUser }
)(MyProfile);
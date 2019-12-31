import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { avatarList } from "../../CreateProfile/AvatarList";

// ACTIONS
import {
  getUserProfile,
  check,
  editProfile, 
  getUser
} from "../../../actions";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grow from "@material-ui/core/Grow";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 100,
    height: 100
  }
}));

const EditAvatar = (props) => {
  // STYLES
  const classes = useStyles();

  // FORM CODE
  const currentUser = useSelector(state => state.user);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [choice, setChoice] = useState();
  const [updateProfile, setUpdateProfile] = useState();
  const [checkSuccess, setCheckSuccess] = useState(false);

  useEffect(() => {
    props.check();
    props.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.getUserProfile(currentUser.userid, setProfile, setUser);
  }, [currentUser])

  useEffect(() => {
    setUpdateProfile({
      avatar: `${choice}`
    });
    setCheckSuccess(false);
  }, [choice]);

  // SETTING INITIAL SETTINGS
  useEffect(() => {
    setChoice(profile.avatar);
  }, [profile, user]);


  // HANDLE SUBMIT
  const handleSubmit = e => {
    e.preventDefault();
    props.editProfile(currentUser.profileid, updateProfile, setCheckSuccess);
  };

  return(
    <div className='editAvatarContainer'>
      <form onSubmit={handleSubmit}>
            <div className="chooseAvatar">
              <h2>avatar</h2>
              {/* {success && ( */}
                <Grow in={checkSuccess}><FormHelperText style={{color:'limeGreen'}}><CheckBoxIcon />update successful!</FormHelperText></Grow>

              {/* )} */}
              <h3>avatar selected:</h3>
              <Avatar src={choice} className={classes.bigAvatar} />
              {/* {console.log('CHOICE', choice)} */}
              <h3>choose an avatar:</h3>
              <div
                style={{
                  border: "2px solid red",
                  display: "flex",
                  flexWrap: "wrap",
                  width: "25%"
                }}
              >
                {avatarList.map((pic, index) => {
                  return (
                    <div key={index}>
                      <Avatar
                        className={classes.bigAvatar}
                        src={pic}
                        onClick={() => setChoice(pic)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default connect(null, {
  getUserProfile,
  check,
  editProfile,
  getUser
})(EditAvatar);
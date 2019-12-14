import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { avatarList } from "../../CreateProfile/AvatarList";

// ACTIONS
import {
  getUserProfile,
  check,
  editProfile
} from "../../../actions";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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
  const userid = localStorage.getItem("userid");
  const profileid = localStorage.getItem("profileid");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [choice, setChoice] = useState();
  const [updateProfile, setUpdateProfile] = useState();

  useEffect(() => {
    props.getUserProfile(userid, setProfile, setUser);
    props.check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUpdateProfile({
      avatar: `${choice}`
    });
  }, [choice]);

  // SETTING INITIAL SETTINGS
  useEffect(() => {
    setChoice(profile.avatar);
  }, [profile, user]);

  // HANDLE SUBMIT
  const handleSubmit = e => {
    e.preventDefault();
    props.editProfile(profileid, updateProfile, props.history);
  };

  return(
    <div className='editAvatarContainer'>
      <form onSubmit={handleSubmit}>
            <div className="chooseAvatar">
              <h2>avatar</h2>
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
  editProfile
})(EditAvatar);
import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";

// ACTIONS
import {
  getUserProfile,
  check,
  editProfile,
  getUser
} from "../../../actions";

// STYLES
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { grey } from "@material-ui/core/colors";
import { TextField } from "@material-ui/core";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { FormHelperText, Button, Grow } from "@material-ui/core";

const ColoredRadio = withStyles({
  root: {
    color: "rgb(182,177,168)",
    "&$checked": {
      color: grey["A400"]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

const EditBirthdate = (props) => {

  // FORM CODE
  // const userid = localStorage.getItem("userid");
  // const profileid = localStorage.getItem("profileid");
  const currentUser = useSelector(state => state.user);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [DOB, setDOB] = useState(new Date());
  const [DOBFormat, setDOBFormat] = useState("");
  const [format, setFormat] = useState("");
  const [updateProfile, setUpdateProfile] = useState();
  const [checkSuccess, setCheckSuccess] = useState(false);

  // FORMAT DOB
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];

  function formatFullDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${day} ${year}`;
  }

  function formatPartialDate(date) {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${year}`;
  }

  function formatMonthDate(date) {
    const monthIndex = date.getMonth();
    return `${monthNames[monthIndex]}`;
  }

  const handleDOBDisplay = e => {
    setCheckSuccess(false);
    setFormat(e.target.value);
    setDOBFormat(e.target.value);
  };

  // HANDLE SUBMIT
  const handleSubmit = e => {
    e.preventDefault();
    props.editProfile(currentUser.profileid, updateProfile, setCheckSuccess);
  };

  useEffect(() => {
    props.check();
    props.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.getUserProfile(currentUser.userid, setProfile, setUser);
  }, [currentUser]);

  useEffect(() => {
    setUpdateProfile({
      dob_display: `${DOBFormat}`,
      dobFormat: `${format}`,
    });
  }, [DOBFormat, format]);

  // SETTING INITIAL SETTINGS
  useEffect(() => {
    setDOB(new Date(user.date_of_birth));
    setDOBFormat(profile.dob_display);
    setFormat(profile.dobFormat);
  }, [profile, user]);

  return(
    <div className='editBirthdateContainer'>
      <form onSubmit={handleSubmit}>
        <h2>date of birth display</h2>
        <Grow direction="left" in={checkSuccess}><FormHelperText style={{color:'limeGreen'}}><CheckBoxIcon /></FormHelperText></Grow>
          <Grow direction="left" in={checkSuccess} {...(checkSuccess ? { timeout: 1500 } : {})}><FormHelperText style={{color:'limeGreen'}}>update successful!</FormHelperText></Grow>
        <TextField
          type="text"
          name="dob"
          variant="outlined"
          label="Read Only"
          placeholder="b"
          value={
            DOB === ""
              ? ""
              : DOBFormat === ""
              ? "do not display"
              : DOBFormat
          }
          InputProps={{
            readOnly: true
          }}
        />

        <RadioGroup
          aria-label="category"
          name="category"
          value={format}
          onChange={handleDOBDisplay}
        >
          <FormControlLabel
            name="DOB"
            value={format === "mm" ? format : formatMonthDate(DOB)}
            control={<ColoredRadio />}
            label="mm"
          />

          <FormControlLabel
            name="DOB"
            value={format === "mm yyyy" ? format : formatPartialDate(DOB)}
            control={<ColoredRadio />}
            label="mm yyyy"
          />

          <FormControlLabel
            name="DOB"
            value={format === "mm dd yyyy" ? format : formatFullDate(DOB)}
            control={<ColoredRadio />}
            label="mm dd yyyy"
          />

          <FormControlLabel
            name="DOB"
            value={format === "" ? format : ""}
            control={<ColoredRadio />}
            label="do not display"
          />
        </RadioGroup>
        <Button type="submit" variant='contained'>Submit</Button>
      </form>
    </div>
  )
}

export default connect(null, {
  getUserProfile,
  check,
  editProfile,
  getUser
})(EditBirthdate);
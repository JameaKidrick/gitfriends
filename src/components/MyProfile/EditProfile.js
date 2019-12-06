import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { avatarList } from '../CreateProfile/AvatarList';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import * as yup from 'yup';

// ACTIONS  
import { getUserProfile, check, editProfile } from '../../actions';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { grey } from '@material-ui/core/colors';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 100,
    height: 100,
  },
}));

const ColoredRadio = withStyles({
  root: {
    color: 'rgb(182,177,168)',
    '&$checked': {
      color: grey['A400'],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

/*
about_me: "robot"
avatar: "/static/media/3.9f6cdb8a.jpg"
created_at: "2019-12-06T03:51:07.416Z"
dob_display: ""
location: "fas"
profile_id: 18
updated_at: "2019-12-06T03:51:07.416Z"
user_id: 21
*/

const EditProfile = (props) => {
  
  // STYLES
  const classes = useStyles();
  
  // FORM CODE
  const userid = localStorage.getItem('userid')
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([]);
  const [choice, setChoice] = useState()
  const [DOB, setDOB] = useState(new Date());
  const [DOBFormat, setDOBFormat] = useState('');
  const [location, setLocation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [updateProfile, setUpdateProfile] = useState({avatar:'', dob_display:''});

  useEffect(() => {
    props.getUserProfile(userid, setProfile, setUser);
    props.check();
  }, [])

  useEffect(() => {
    setUpdateProfile({avatar:`${choice}`, dob_display:`${DOBFormat}`, location:`${location}`, about_me:`${aboutMe}`})
  }, [choice, DOBFormat, location, aboutMe])

  useEffect(() => {
    setChoice(profile.avatar)
  }, [profile])

  // FORMAT DOB
  const monthNames = [
    "january", "february", "march",
    "april", "may", "june", "july",
    "august", "september", "october",
    "november", "december"
  ];

  function formatFullDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${day} ${year}`
  }

  function formatPartialDate(date) {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${year}`
  }

  function formatMonthDate(date) {
    const monthIndex = date.getMonth();
    return `${monthNames[monthIndex]}`
  }

  // HANDLE DOB
  const handleDOBChange = date => {
    setDOB(date)
  }
  
  const handleDOBDisplay = e => {
    setDOBFormat(e.target.value)
  }

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
    props.editProfile(user, profile, props.history);
  }

  return(
    <div className='createProfile'>
      Hello CreateProfilePage!
      {/********************************************** CHOOSE AVATAR **********************************************/}
      <div className='chooseAvatar'>
        <h3>avatar selected:</h3>
        <Avatar src={choice} className={classes.bigAvatar} />
        {console.log('CHOICE', choice)}
        <h3>choose an avatar:</h3>
        <div style={{border:'2px solid red', display:'flex', flexWrap:'wrap', width:'25%'}}>
          {avatarList.map((pic, index) => {
            return(
              <div key={index}>
                <Avatar className={classes.bigAvatar} src={pic} onClick={()=>setChoice(pic)} />
              </div>
            )
          })}
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/********************************************** CHOOSE DOB **********************************************/}
        <TextField
          type='text'
          name='dob'
          variant='outlined'
          label="Read Only"
          value={DOB === '' ? '':formatFullDate(DOB)}
          InputProps={{
            readOnly: true,
          }}
        />

        <Calendar onChange={date => handleDOBChange(date)} calendarType='US' />

        <RadioGroup aria-label="category" name="category" value={DOBFormat} onChange={handleDOBDisplay}>
          <FormControlLabel
          name='DOB'
          value={formatMonthDate(DOB)}
          control={<ColoredRadio />} 
          label="mm"
          />

          <FormControlLabel
          name='DOB'
          value={formatPartialDate(DOB)}
          control={<ColoredRadio />} 
          label="mm yyyy"
          />

          <FormControlLabel
          name='DOB'
          value={formatFullDate(DOB)}
          control={<ColoredRadio />} 
          label="mm dd yyyy"
          />

          <FormControlLabel
          name='DOB'
          value=''
          control={<ColoredRadio />} 
          label="do not display"
          />
        </RadioGroup>
        {/********************************************** ADD LOCATION **********************************************/}
        <TextField
          label='location'
          variant='outlined'
          onChange={handleLocationChange}
        />
        {/********************************************** ADD ABOUT ME **********************************************/}
        <TextField
          label='about me'
          variant='outlined'
          multiline
          onChange={handleAboutMeChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { getUserProfile, check }
)(EditProfile);
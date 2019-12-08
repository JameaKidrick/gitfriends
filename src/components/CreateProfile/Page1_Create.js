import React, { useState, useEffect } from 'react';
import { avatarList } from './AvatarList';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';

// ACTIONS  
import { createProfile, check } from '../../actions';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const CreateProfile = (props) => {

  // STYLES
  const classes = useStyles();

  // FORM CODE
  const user = localStorage.getItem('userid')
  const [choice, setChoice] = useState('')
  const [DOB, setDOB] = useState(new Date());
  const [DOBFormat, setDOBFormat] = useState('');
  const [format, setFormat] = useState('');
  const [location, setLocation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [profile, setProfile] = useState({avatar:'', dob_display:''});

  useEffect(() => {
    props.check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setProfile({avatar:`${choice}`, dob_display:`${DOBFormat}`, dobFormat:`${format}`, location:`${location}`, about_me:`${aboutMe}`})
  }, [choice, DOBFormat, format, location, aboutMe])

  // // YUP VALIDATION
  // let schema = yup.object().shape({

  // })

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
    console.log(e.target.name)
    setDOBFormat(e.target.value)
    if(e.target.name === 'NoDOB'){
      setFormat('')
    }else if(e.target.name === 'MonthDOB'){
      setFormat('mm')
    }else if(e.target.name === 'PartialDOB'){
      setFormat('mm yyyy')
    }else if(e.target.name === 'FullDOB'){
      setFormat('mm dd yyyy')
    }
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
    props.createProfile(user, profile, props.history);
  }

  return(
    <div className='createProfile'>
      Hello CreateProfilePage!
      {/********************************************** CHOOSE AVATAR **********************************************/}
      <div className='chooseAvatar'>
        <h3>avatar selected:</h3>
        <Avatar src={choice} className={classes.bigAvatar} />
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
          name='MonthDOB'
          value={formatMonthDate(DOB)}
          control={<ColoredRadio />} 
          label="mm"
          />

          <FormControlLabel
          name='PartialDOB'
          value={formatPartialDate(DOB)}
          control={<ColoredRadio />} 
          label="mm yyyy"
          />

          <FormControlLabel
          name='FullDOB'
          value={formatFullDate(DOB)}
          control={<ColoredRadio />} 
          label="mm dd yyyy"
          />

          <FormControlLabel
          name='NoDOB'
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
  { createProfile, check }
)(CreateProfile);
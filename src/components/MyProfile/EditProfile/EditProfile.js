import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { avatarList } from '../../CreateProfile/AvatarList';

// COMPONENTS
import EditFaveLanguage from './EditLang';

// ACTIONS
import { getUserProfile, check, editProfile } from '../../../actions';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { grey } from '@material-ui/core/colors';
import { TextField } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
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

const EditProfile = (props) => {
  // STYLES
  const classes = useStyles();
  const [value, setValue] = useState(3);
  
  // FORM CODE
  const userid = localStorage.getItem('userid');
  const profileid = localStorage.getItem('profileid');
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [choice, setChoice] = useState();
  const [DOB, setDOB] = useState(new Date());
  const [DOBFormat, setDOBFormat] = useState('');
  const [format, setFormat] = useState('');
  const [location, setLocation] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [updateProfile, setUpdateProfile] = useState({avatar:'', dob_display:''})

  useEffect(() => {
    props.getUserProfile(userid, setProfile, setUser);
    props.check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUpdateProfile({avatar:`${choice}`, dob_display:`${DOBFormat}`, dobFormat:`${format}`, location:`${location}`, about_me:`${aboutMe}`})
  }, [choice, DOBFormat, location, aboutMe, format])

  // SETTING INITIAL SETTINGS
  useEffect(() => {
    setChoice(profile.avatar)
    setDOB(new Date(user.date_of_birth))
    setLocation(profile.location)
    setAboutMe(profile.about_me)
    setDOBFormat(profile.dob_display)
    setFormat(profile.dobFormat)
  }, [profile, user])

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
  // const handleDOBChange = date => {
  //   setDOB(date)
  // }
  
  const handleDOBDisplay = e => {
    setFormat(e.target.value)
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
    props.editProfile(profileid, updateProfile, props.history);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h1>edit your profile</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="avatar" {...a11yProps(0)} />
          <Tab label="birthdate display" {...a11yProps(1)} />
          <Tab label="location & about me" {...a11yProps(2)} />
          <Tab label="favorite language" {...a11yProps(3)} />
          <Tab label="user settings" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
        {/********************************************** CHOOSE AVATAR **********************************************/}
        <TabPanel value={value} index={0} style={{border:'2px solid green', width:'80%', height:'100%'}}>
          <div className='chooseAvatar'>
            <h2>avatar</h2>
            <h3>avatar selected:</h3>
            <Avatar src={choice} className={classes.bigAvatar} />
            {/* {console.log('CHOICE', choice)} */}
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
        </TabPanel>
        {/********************************************** CHOOSE DOB **********************************************/}
        <TabPanel value={value} index={1}>
          <h2>date of birth display</h2>
          <TextField
            type='text'
            name='dob'
            variant='outlined'
            label="Read Only"
            placeholder='b'
            value={DOB === '' ? '':DOBFormat === '' ? 'do not display': DOBFormat}
            InputProps={{
              readOnly: true,
            }}
          />

          {/* <Calendar onChange={date => handleDOBChange(date)} calendarType='US' /> */}
          <RadioGroup aria-label="category" name="category" value={format} onChange={handleDOBDisplay}>
            <FormControlLabel
            name='DOB'
            value={format === 'mm' ? format:formatMonthDate(DOB)}
            control={<ColoredRadio />} 
            label="mm"
            />

            <FormControlLabel
            name='DOB'
            value={format === 'mm yyyy' ? format:formatPartialDate(DOB)}
            control={<ColoredRadio />} 
            label="mm yyyy"
            />

            <FormControlLabel
            name='DOB'
            value={format === 'mm dd yyyy' ? format:formatFullDate(DOB)}
            control={<ColoredRadio />} 
            label="mm dd yyyy"
            />

            <FormControlLabel
            name='DOB'
            value={format === '' ? format:''}
            control={<ColoredRadio />} 
            label="do not display"
            />
          </RadioGroup>
        </TabPanel>
        {/********************************************** ADD LOCATION & ABOUT ME **********************************************/}
        <TabPanel value={value} index={2}>
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
        </TabPanel>
        <TabPanel value={value} index={3} style={{width:'80%', height:'100%'}}>
          <EditFaveLanguage />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default connect(
  null,
  { getUserProfile, check, editProfile }
)(EditProfile);
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// STYLES
import { Button, TextField, Typography, Slide, List, ListItem, makeStyles, withStyles, Radio, RadioGroup, FormControlLabel, useTheme, MobileStepper, InputLabel, MenuItem, Select, FormControl, Checkbox, FormGroup } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// // TEMPORARY
// import A from '../images/0.jpg';
// import B from '../images/1.jpg';
// import C from '../images/2.jpg';
// import D from '../images/3.jpg';
// import E from '../images/4.jpg';
// import F from '../images/5.jpg';
// import G from '../images/6.jpg';
// import H from '../images/7.jpg';
// import I from '../images/8.jpg';

// ACTIONS
import { getAllProfilesWithUsers, check, findFriendshipStatus, getUsersFriends, sendFriendRequest, getUser, getFriendRequests } from '../actions';

const ColoredRadio = withStyles({
  root: {
    color: 'rgb(182,177,168)',
    '&$checked': {
      color: grey['A400'],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    margin: '0 auto'
  },
});


const Users = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const isFetching = useSelector(state => state.isFetching);
  const currentUser = useSelector(state => state.user);
  const profiles = useSelector(state => state.profiles);
  const queries = useSelector(state => state.queries);
  const friends = useSelector(state => state.friends);
  const requests = useSelector(state => state.requests);

  const userid = currentUser.userid;
  const [query, setQuery] = useState(props.location.search);
  const [filterObj, setFilterObj] = useState({});
  const [filtering, setFiltering] = useState(true);
  const [filteredProfiles, setFilteredProfiles] = useState();
  const [totalPages, setTotalPages] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [limit, setLimit] = useState(4);
  const [state, setState] = useState({
    filterFriends: false,
    filterPending: false,
    antoine: false,
  });
  let { filterFriends, filterPending, antoine } = state;

  useEffect(() => {
    props.getAllProfilesWithUsers(query, props.history, setTotalPages);
    props.check();
    props.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // `?sortby=${filterObj.sortby}&sortdir=${filterObj.sortdir}&limit=0&page=1`

  useEffect(() => {
    props.getUsersFriends(userid);
    props.getFriendRequests(userid);
  }, [currentUser])

  useEffect(() => {
    setFilteredProfiles(profiles)
  }, [profiles])

  useEffect(() => {
    props.getAllProfilesWithUsers(query, props.history, setTotalPages);
  }, [query])

  useEffect(() => {
    if(filteredProfiles || filterPending){
      if(filterFriends){
        let match = {};
  
        friends.forEach(element => {
          match = {...match, [element.friendid] : true}
        })
        let results = profiles.filter(item => {
          return !match[item.user_id]
        })
  
        setFilteredProfiles(results)
        
        console.log('FRIENDS', friends, 'ALL PROFILES', profiles, 'FILTEREDPROFILES', filteredProfiles, 'RESULTS - REMOVED FRIENDS', results)
      }else{
        let match = {};
  
        friends.forEach(element => {
          match = {...match, [element.friendid] : true}
        })
        let results = profiles.filter(item => {
          return match[item.user_id]
        })
  
        setFilteredProfiles(filteredProfiles.concat(results))
        
        console.log('FRIENDS', friends, 'ALL PROFILES', profiles, 'FILTEREDPROFILES', filteredProfiles, 'RESULTS - REMOVED FRIENDS', results)
      }
    }
  }, [query, state])

  const sendFriendRequest = (user) => {
    props.sendFriendRequest(user.user_id, userid);
  };

  const filterOutFriends = () => {
    /*
    const fake1 = [{number: 1}, {number: 6}, {number: 3}, {number: 4}, {number: 5}]
    const fake2 = [{number: 5}, {number: 6}, {number: 7}, {number: 8}, {number: 9}]

    // CREATE EMPTY OBJECT
    let match = {};
    // ITERATE THROUGH THE SECOND ARRAY OF OBJECTS AND PLACE THEM IN THE NEW OBJECT BASED ON THE PROPERTY WE WANT TO USE FOR THE COMPARISON
    // THE NEW OBJECT WILL HAVE THE PROPERTY AS THE VALUE TO BE COMPARED
    fake2.forEach(element => {
      match = {...match, [element.number] : true} // ALSO WRITTEN AS: ids[bb.number] = true;
    })

    // FILTER THROUGH THE FIRST ARRAY OF OBJECTS AND COMPARE THE PROPERTY OF THE NEW OBJECT WITH THE VALUE OF THE FILTER ARRAY'S OBJECT
    let result = fake1.filter(item => {
      return match[item.number]
    })

    console.log(result)
    */

    let match = {};

    friends.forEach(element => {
      match = {...match, [element.friendid] : true}
    })
    let results = filteredProfiles.filter(item => {
      return !match[item.user_id]
    })
    
    console.log('FRIENDS', friends, 'ALL PROFILES', filteredProfiles, 'RESULTS - REMOVED FRIENDS', results)
  };

  const filterOutPending = () => {
    let match = {};

    requests.forEach(element => {
      match = {...match, [element.friendid] : true}
    })
    let results = filteredProfiles.filter(item => {
      return !match[item.user_id]
    })
    
    console.log('REQUESTS', requests, 'ALL PROFILES', filteredProfiles, 'RESULTS - REMOVED REQUESTS', results)
  };

  const handleFilterChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setQuery(`?sortby=${queries.sortby ? queries.sortby : 'user_id'}&sortdir=${queries.sortdir ? queries.sortdir : 'asc'}&page=${activeStep+1+1}&limit=${limit}`)
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    setQuery(`?sortby=${queries.sortby}&sortdir=${queries.sortdir}&page=${activeStep+1-1}&limit=${limit}`)
  };

  const handleLimit = e => {
    setLimit(e.target.value)
    setQuery(`?sortby=${queries.sortby ? queries.sortby : 'user_id'}&sortdir=${queries.sortdir ? queries.sortdir : 'asc'}&page=${activeStep+1}&limit=${e.target.value}`)
  }

  const handleQueryChange = e => {
    setFilterObj({...filterObj, [e.target.name]: e.target.value })
  };

  const handleSubmit = e => {
    setQuery(`?sortby=${filterObj.sortby}&sortdir=${filterObj.sortdir}&page=${activeStep+1}&limit=${limit}`)
  };

  if(isFetching || !filteredProfiles){
    return(
      <div>
        <h2>
          Loading...
        </h2>
      </div>
    )
  }

  return(
    <div>
      <Button type='button' onClick={()=>filterOutFriends()}>TEST FILTER FRIENDS</Button>
      <Button type='button' onClick={()=>filterOutPending()}>TEST FILTER PENDING</Button>
      <TextField 
        fullWidth
        variant='outlined'
        name='search'
        placeholder='search users'
      />
      <div style={{border:'3px solid green', display:'flex', flexDirection:'row-reverse'}}>
        <div style={{border:'1px solid black', width:'15%'}}>
          <Typography><FilterListIcon></FilterListIcon>Filter & Sort</Typography>
          <br />
          {filtering && (
            <form onSubmit={handleSubmit} style={{border:'2px solid blue'}}>
              <Typography>Filter</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={filterFriends} onChange={handleFilterChange('filterFriends')} value="filterFriends" />}
                  label="Friends"
                />
                <FormControlLabel
                  control={<Checkbox checked={filterPending} onChange={handleFilterChange('filterPending')} value="filterPending" />}
                  label="Pending Friend"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={antoine} onChange={handleFilterChange('antoine')} value="antoine" />
                  }
                  label="Antoine Llorca"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={antoine} onChange={handleFilterChange('antoine')} value="antoine" />
                  }
                  label="Show All"
                />
              </FormGroup>
              <Typography>Sort By:</Typography>
              <RadioGroup aria-label="sortby" name="sortby" value={filterObj.sortby ? filterObj.sortby : queries.sortby ? queries.sortby : 'user_id'} onChange={handleQueryChange}>
                <FormControlLabel
                name='sortby'
                value='user_id'
                control={<ColoredRadio />} 
                label="user id"
                />

                <FormControlLabel
                name='sortby'
                value='username'
                control={<ColoredRadio />} 
                label="username"
                />
              </RadioGroup>
              <br />
              <Typography>Sort Direction:</Typography>
              <RadioGroup aria-label="sortdir" name="sortdir" value={filterObj.sortdir ? filterObj.sortdir : queries.sortdir ? queries.sortdir : 'asc'} onChange={handleQueryChange}>
                <FormControlLabel
                name='sortdir'
                value='asc'
                control={<ColoredRadio />} 
                label='ascending'
                />

                <FormControlLabel
                name='sortdir'
                value='desc'
                control={<ColoredRadio />} 
                label='descending'
                />
              </RadioGroup>
              <Button type='submit' variant='contained'>filter</Button>
            </form>
          )}
        </div>
        <div style={{border:'3px solid purple', width: '100%'}}>
          <div style={{border:'1px solid black', display:'flex', flexWrap:'wrap'}}>
            {filteredProfiles.map((item, index)=> {
              return(
                <div key={index} style={{border:'1px solid red', margin:'2%'}}>
                  <Link to={`/profile/${item.user_id}`}>
                    
                    <div style={{border:'1px solid black', width:'200px'}}>
                        <h4>
                          {item.username}
                        </h4>
                        <img src={item.avatar} alt={`avatar ${index}`} style={{width:'100px'}} />
                    </div>
                  </Link>
                  {friends.find(friend => { 
                    // CHECK TO SEE IF:
                      // 1. USER IS THE FRIEND AND THE FRIEND IS NOT THE CURRENT USER
                      return ((item.user_id === friend.friendid) && item.user_id !== userid)
                    }) 
                    ? 
                    // (IF THIS^^^ IS TRUE, SHOW A 'FRIENDS' BUTTON)
                    <button>friends</button> 
                    : 
                    // 2. FRIEND ID IS THE CURRENT USER
                    item.user_id === userid 
                    ? 
                    // (IF THIS IS TRUE, DON'T SHOW ANYTHING)
                    true 
                    : 
                    // 4. IF THE PERSON AND THE CURRENT USER ARE NOT FRIENDS, BUT THERE IS AN OPEN FRIEND REQUEST
                    requests.find(friend => { 
                      return ((item.user_id === friend.friendid) && item.user_id !== userid)
                    }) 
                    ?
                    // (IF THIS IS TRUE, SHOW A 'PENDING FRIEND REQUEST' BUTTON)
                    <Link to={`myprofile/${userid}/friendrequests`}><button>pending friend request</button></Link>
                    :
                    // 5. IF NONE OF THE ABOVE IS TRUE, SHOW AN 'ADD FRIEND' BUTTON
                    <button onClick={()=>{sendFriendRequest(item)}}>add friend</button>}
                </div>
              )
            })}
          </div>
          {totalPages > 1 && (
            <MobileStepper
              style={{ cursor:'pointer' }}
              variant="dots"
              steps={totalPages}
              position="bottom"
              activeStep={activeStep}
              className={classes.root}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          )}
          <FormControl className={classes.formControl}>
            <InputLabel id="select-label">Show</InputLabel>
            <Select
              id="selectAmount"
              value={limit}
              onChange={handleLimit}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default connect(
  null,
  { getAllProfilesWithUsers, check, findFriendshipStatus, getUsersFriends, sendFriendRequest, getUser, getFriendRequests }
)(Users);
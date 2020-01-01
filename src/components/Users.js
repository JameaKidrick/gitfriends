import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, TextField, Typography, Slide, List, ListItem, makeStyles, withStyles, Radio, RadioGroup, FormControlLabel, } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import FilterListIcon from '@material-ui/icons/FilterList';

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

const Users = (props) => {
  const isFetching = useSelector(state => state.isFetching);
  const currentUser = useSelector(state => state.user);
  const profiles = useSelector(state => state.profiles);
  const queries = useSelector(state => state.queries);
  const friends = useSelector(state => state.friends);
  const requests = useSelector(state => state.requests);
  const userid = currentUser.userid;
  const [query, setQuery] = useState(props.location.search)
  const [filterObj, setFilterObj] = useState({})
  const [filtering, setFiltering] = useState(true)
  const [filteredProfiles, setFilteredProfiles] = useState()

  useEffect(() => {
    props.getAllProfilesWithUsers(query);
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
    props.getAllProfilesWithUsers(query);
  }, [query])

  const sendFriendRequest = (user) => {
    props.sendFriendRequest(user.user_id, userid);
  };

  const filterFriends = () => {
    /*
    function getCount(str) {
      let vowels = ['a','e','i','o','u'];
      return str.split('').filter(letter => {
        return vowels.includes(letter)? true : false;
      }).length;
    }
    function fn(parameter) {
      let arr1 = []
      return arr2.filter(item => {
        return condition
      })
    }
    */
    // console.log('clicked')
  };

  const filterPending = () => {

  };

  const handleQueryChange = e => {
    setFilterObj({...filterObj, [e.target.name]: e.target.value })
  };

  const handleSubmit = e => {
    setQuery(`?sortby=${filterObj.sortby}&sortdir=${filterObj.sortdir}`)
  };

  if(isFetching){
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
      <Button type='button' onClick={()=>filterFriends()}>TEST</Button>
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
        <div style={{border:'1px solid black', display:'flex', flexWrap:'wrap'}}>
          {profiles.map((item, index)=> {
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
                    // 1. USER 1 IS THE FRIEND AND THE FRIEND IS NOT THE CURRENT USER
                    // 2. USER 2 IS THE FRIEND AND THE FRIEND IS NOT THE CURRENT USER
                    return ((item.user_id === friend.user1_id) && item.user_id !== userid) || (item.user_id === friend.user2_id) && item.user_id !== userid
                  }) 
                  ? 
                  // (IF EITHER OF THESE^^^ ARE TRUE, SHOW A 'FRIENDS' BUTTON)
                  <button>friends</button> 
                  : 
                  // 3. FRIEND ID IS THE CURRENT USER
                  item.user_id === userid 
                  ? 
                  // (IF THIS IS TRUE, DON'T SHOW ANYTHING)
                  true 
                  : 
                  // 4. IF THE PERSON AND THE CURRENT USER ARE NOT FRIENDS, BUT THERE IS AN OPEN FRIEND REQUEST
                  requests.find(friend => { 
                    return ((item.user_id === friend.user1_id) && item.user_id !== userid) || (item.user_id === friend.user2_id) && item.user_id !== userid
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
      </div>
    </div>
  )
}

export default connect(
  null,
  { getAllProfilesWithUsers, check, findFriendshipStatus, getUsersFriends, sendFriendRequest, getUser, getFriendRequests }
)(Users);
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
import { getAllProfilesWithUsers, check, findFriendshipStatus, getUsersFriends, sendFriendRequest, getUser } from '../actions';

const Users = (props) => {
  const currentUser = useSelector(state => state.user);
  const isFetching = useSelector(state => state.isFetching);
  const profiles = useSelector(state => state.profiles);
  const friends = useSelector(state => state.friends);
  const userid = currentUser.userid;

  useEffect(() => {
    props.getAllProfilesWithUsers();
    props.check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    props.getUsersFriends(userid);
  }, [currentUser])

  useEffect(() => {
    let friendsList = friends.filter(element => {
      return element.user2_id !== userid
    })
  }, [friends])

  const sortedProfiles = profiles.sort((a, b) => {
    return a.user_id - b.user_id
  })

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
    <div style={{border:'1px solid black', display:'flex', flexWrap:'wrap'}}>
      {sortedProfiles.map((item, index)=> {
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
              return (item.user_id === friend.user1_id) && item.user_id !== userid || (item.user_id === friend.user2_id) && item.user_id !== userid
            }) ? <button>yes</button>: item.user_id === userid ? true : <button onClick={()=>{props.sendFriendRequest(item.user_id)}}>no</button>}
          </div>
        )
      })}
    </div>
  )
}

export default connect(
  null,
  { getAllProfilesWithUsers, check, findFriendshipStatus, getUsersFriends, sendFriendRequest, getUser }
)(Users);
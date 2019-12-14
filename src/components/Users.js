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
import { getAllProfilesWithUsers, check, findFriendshipStatus, getUsersFriends, sendFriendRequest } from '../actions';

const Users = (props) => {
  const isFetching = useSelector(state => state.isFetching);
  const profiles = useSelector(state => state.profiles);
  const friends = useSelector(state => state.friends);
  const userid = Number(localStorage.getItem('userid'));

  const [allFriends, setAllFriends] = useState([])

  useEffect(() => {
    props.getAllProfilesWithUsers();
    props.check();
    props.getUsersFriends(userid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let friendsList = friends.filter(element => {
      return element.user2_id !== userid
    })
    console.log(friendsList)
  }, [friends])
  
  // GET ARRAY OF USER'S FRIENDS' IDS
  // WITHIN THE RETURN, IF ITEM.USER_ID IS WITHIN ARRAY RETURN TRUE/SHOW FRIEND BUTTON OTHERWISE SHOW ADD FRIEND BUTTON

  const sortedProfiles = profiles.sort((a, b) => {
    return a.user_id - b.user_id
  })

  console.log(friends)
  
  console.log(allFriends)

  if(isFetching){
    return(
      <div>
        <h2>
          Loading...
        </h2>
      </div>
    )
  }
// INFINITE LOOP ALERT
// FIGURE OUT HOW TO FIND THE FRIENDSHIP STATUS PER USER AND ADD CORRESPONDING BUTTON
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
  { getAllProfilesWithUsers, check, findFriendshipStatus, getUsersFriends, sendFriendRequest }
)(Users);

// console.log('2', item.user_id)
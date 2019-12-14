import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { check, getUsersFriends, deleteFriend } from '../../actions';
import { Avatar } from '@material-ui/core';

const FriendsList = (props) => {
  const friends = useSelector(state => state.friends);
  const userid = Number(localStorage.getItem('userid'));

  useEffect(() => {
    props.check();
    props.getUsersFriends(userid);
  }, [])

  console.log(friends)

  return(
    <div className='friendsListContainer'>
      Hello Friends!
      {friends.map(friend => {
          if(userid === friend.user1_id){
            return(
              <>
                <h3>Username: {friend.user2_username}</h3>
                <Avatar src={friend.user2_avatar} />
                <button onClick ={()=>props.deleteFriend(friend.request_id)}>delete</button>
              </>
            )
          }else if(userid === friend.user2_id){
            return(
              <>
                <h3>Username: {friend.user1_username}</h3>
                <Avatar src={friend.user1_avatar} />
              </>
            )
          }
      })}
    </div>
  )
}

export default connect(null, 
  { check, getUsersFriends, deleteFriend }
)(FriendsList);
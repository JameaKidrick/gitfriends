import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { check, getUsersFriends, deleteFriend, getUser } from '../../actions';
import { Avatar } from '@material-ui/core';

const FriendsList = (props) => {
  const currentUser = useSelector(state => state.user);
  const friends = useSelector(state => state.friends);
  const userid = currentUser.userid;

  useEffect(() => {
    props.check();
  }, [])
  
  useEffect(() => {
    props.getUsersFriends(userid);
  }, [currentUser])

  return(
    <div className='friendsListContainer'>
      Hello Friends!
      {friends.map((friend, index) => {
        return(
          <div key={index}>
            <h3>Username: {friend.friend_username}</h3>
            <Avatar src={friend.friend_avatar} />
            <button onClick ={()=>props.deleteFriend(friend.request_id)}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default connect(null, 
  { check, getUsersFriends, deleteFriend, getUser }
)(FriendsList);
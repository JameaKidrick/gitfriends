import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ACTIONS
import { getFriendRequests, check, respondToFriendRequest, deleteFriendRequest, getUser } from '../../actions';

// STYLE
import { Typography, Avatar, Divider } from '@material-ui/core';

const FriendRequests = (props) => {
  const currentUser = useSelector(state => state.user);
  const error = useSelector(state => state.error);
  const requests = useSelector(state => state.requests);
  const userid = currentUser.userid;

  useEffect(() => {
    props.check();
    props.getUser();
  }, [])
  
  useEffect(() => {
    props.getFriendRequests(userid);
  }, [currentUser])

  const acceptRequest = (requestid) => {
    props.respondToFriendRequest(userid, requestid, {request_status: 2})
  }

  const denyRequest = (requestid) => {
    props.respondToFriendRequest(userid, requestid, {request_status: 3})
  }
  /*
  (error && error === 'No new requests') ? 
      <Typography>no new requests</Typography>
      :
  */

  return (
    <div className='friendRequestsContainer'>
      <br />
      <Typography variant='h4' style={{fontWeight:'bold'}}>Friend Requests</Typography>
      <br />
      <Typography variant='h6'>your sent friend requests</Typography>
      {(error && error === 'No new requests') ? 
      <Typography>no sent requests</Typography>
      :
      (requests.map((item, index) => {
          if(userid === item.requestor_id){
            return(
              <div key={index}>
                <p>REQUEST ID: {item.request_id}</p>
                <p>USERNAME: {item.friend_username}</p>
                <Avatar src={item.friend_avatar} />
                <Link to={`/profile/${item.friendid}`}><button>see profile</button></Link>
                <button onClick={()=>props.deleteFriendRequest(item.request_id, userid)}>cancel request</button>
              </div>
            )
          }else{
            return <Typography>no sent requests</Typography>
          }
        }))}
      <br />
      <Divider/>
      <br />
      <Typography variant='h6'>respond to your friend requests</Typography>
      {(error && error === 'No new requests') ? 
      <Typography>no new requests</Typography>
      :
      (requests.map((item, index) => {
        if(userid !== item.requestor_id){
          return(
            <div key={index}>
              <p>REQUEST ID: {item.request_id}</p>
              <p>USERNAME: {item.friend_username}</p>
              <Avatar src={item.friend_avatar} />
              <Link to={`/profile/${item.friendid}`}><button>see profile</button></Link>
              <button onClick={()=>acceptRequest(item.request_id)}>accept</button>
              <button onClick={()=>denyRequest(item.request_id)}>decline</button>
            </div>
          )
        }else{
          return <Typography>no new requests</Typography>
        }
      }))}
    </div>
  )
}

export default connect(
  null,
  { getFriendRequests, check, respondToFriendRequest, deleteFriendRequest, getUser }
)(FriendRequests);
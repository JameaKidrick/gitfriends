import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ACTIONS
import { getFriendRequests, check, respondToFriendRequest } from '../../actions';

// STYLE
import Avatar from '@material-ui/core/Avatar';

const FriendRequests = (props) => {
  const userid = Number(localStorage.getItem('userid'));
  const requests = useSelector(state => state.requests);
  // const [request, setRequest] = useState([])
  useEffect(() => {
    props.getFriendRequests(userid)
    props.check()
  }, [])

  console.log(requests)
  const acceptRequest = (requestid) => {
    props.respondToFriendRequest(userid, requestid, {request_status: 2})
  }

  const denyRequest = (requestid) => {
    props.respondToFriendRequest(userid, requestid, {request_status: 3})
  }

  return (
    <div className='friendRequestsContainer'>
      Hey Friends!
      {requests.map(item => {
        if(userid === item.user1_id){
          return(
            <>
              <p>REQUEST ID: {item.request_id}</p>
              <p>USERNAME: {item.user2_username}</p>
              <Avatar src={item.user2_avatar} />
              <Link to={`/profile/${item.user2_id}`}><button>see profile</button></Link>
              <button onClick={()=>acceptRequest(item.request_id)}>accept</button>
              <button onClick={()=>denyRequest(item.request_id)}>decline</button>
            </>
          )
        }else if(userid === item.user2_id){
          return(
            <>
              <p>REQUEST ID: {item.request_id}</p>
              <p>USERNAME: {item.user1_username}</p>
              <Avatar src={item.user1_avatar} />
              <Link to={`/profile/${item.user1_id}`}><button>see profile</button></Link>
              <button onClick={()=>acceptRequest(item.request_id)}>accept</button>
              <button onClick={()=>denyRequest(item.request_id)}>decline</button>
            </>
          )
        }
      })}
    </div>
  )
}

export default connect(
  null,
  { getFriendRequests, check, respondToFriendRequest }
)(FriendRequests);
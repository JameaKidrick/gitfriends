import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { getFriendRequests, check } from '../../actions';

const FriendRequests = (props) => {
  const userid = Number(localStorage.getItem('userid'));
  const requests = useSelector(state => state.requests);

  useEffect(() => {
    props.getFriendRequests(userid)
  }, [])

  console.log(requests)

  return (
    <div className='friendRequestsContainer'>
      Hey Friends!
    </div>
  )
}

export default connect(
  null,
  { getFriendRequests, check }
)(FriendRequests);
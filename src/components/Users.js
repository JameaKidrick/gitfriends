import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ACTIONS
import { getAllProfilesWithUsers } from '../actions';

const Users = (props) => {
  const isFetching = useSelector(state => state.isFetching)
  const profiles = useSelector(state => state.profiles)

  const sortedProfiles = profiles.sort((a, b) => {
    return a.user.user_id - b.user.user_id
  })

  useEffect(() => {
    props.getAllProfilesWithUsers()
  }, [])

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
            <Link to='/'>
              <div style={{border:'1px solid black', width:'200px'}}>
                  <h4>
                    {item.user.username}
                  </h4>
                  <img src={item.profile.avatar} style={{width:'100px'}} />
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default connect(
  null,
  { getAllProfilesWithUsers }
)(Users);
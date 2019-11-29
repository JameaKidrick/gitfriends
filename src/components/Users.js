import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// TEMPORARY
import A from '../images/0.jpg';
import B from '../images/1.jpg';
import C from '../images/2.jpg';
import D from '../images/3.jpg';
import E from '../images/4.jpg';
import F from '../images/5.jpg';
import G from '../images/6.jpg';
import H from '../images/7.jpg';
import I from '../images/8.jpg';

// ACTIONS
import { getAllProfilesWithUsers, check } from '../actions';

const Users = (props) => {
  const isFetching = useSelector(state => state.isFetching)
  const profiles = useSelector(state => state.profiles)

  useEffect(() => {
    props.getAllProfilesWithUsers()
    props.check();
  }, [])
  
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
                  <img src={item.avatar} style={{width:'100px'}} />
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
  { getAllProfilesWithUsers, check }
)(Users);
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux'; 

// ACTIONS
import { getUserPosts } from '../../actions';

const Posts = (props) => {
  const posts = useSelector(state => state.posts);
  const userid = Number(localStorage.getItem('userid'));

  useEffect(() => {
    props.getUserPosts(userid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <div className='postsContainer'>
      Post
      {posts.map(item => {
        return(
          <h2>{item.title}</h2>
        )
      })}
    </div>
  )
};

export default connect(
  null,
  { getUserPosts }
)(Posts);
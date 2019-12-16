import React, { useState, useEffect } from 'react';

// ACTIONS
import { getLanguages, addFaveLanguages, check, getUser } from '../../actions';

// STYLES
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, FormHelperText } from '@material-ui/core';
import { css } from '@emotion/core';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const override = css`
  display: block;
  margin: 20% auto;
  border-color: red;
`;

const FaveLanguage = (props) => {
  const currentUser = useSelector(state => state.user);
  const isFetching = useSelector(state => state.isFetching);
  // const error = useSelector(state => state.error);
  const languages = useSelector(state => state.languages);

  const profileid = currentUser.profileid;
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState(false);
  const [dislikes, setDislikes] = useState(useSelector(state => state.languages));
  const [fave, setFave] = useState([]);

  useEffect(() => {
    props.getLanguages();
    props.check();
    props.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setDislikes(languages)
  }, [languages])

  useEffect(() => {
    likes.map(item => {
      setFave([...fave, {language_id:item.language_id}])
    })
  }, [likes])

  const addLanguage = value => {
    const addToLikes = dislikes.filter(element => {
      return element.language_id === value
    })
    const removeFromDislikes = dislikes.filter(element => {
      return !(element.language_id === value)
    })
    setLikes([...likes, addToLikes[0]])
    setDislikes(removeFromDislikes)
  }
  
  const removeLanguage = value => {
    const addToDislikes = likes.filter(element => {
      return element.language_id === value
    })
    const removeFromLikes = likes.filter(element => {
      return !(element.language_id === value)
    })
    setLikes(removeFromLikes)
    setDislikes([...dislikes, addToDislikes[0]])
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    if(!fave[0]){
      setError(true)
    }else{
      props.addFaveLanguages(profileid, fave, props.history)
    }
  }

  if(isFetching){
    return(
      <ClimbingBoxLoader 
        css={override}
      />
    )
  }

  return(
    <div>
      <form onSubmit={handleSubmit} style={{display:'flex', justifyContent: 'space-between', width:'100%'}}>
        <Typography>fave languages</Typography>
        {error && (
          <FormHelperText error>please choose at least one language</FormHelperText>
        )}
        {!dislikes[0] ?
          <div style={{width:'40%', border:'2px solid blue', textAlign:'center'}}>
            <h2>genius alert!</h2>
          </div>
          :
          <List style={{display:'flex', flexWrap:'wrap', width:'40%', height:'20%'}}>
            {dislikes.sort((a,b)=>{return a.language_id-b.language_id}).map((item, index) => {
              return(
                <ListItem button key={index} style={{border:'2px solid green', width:'33%', }} onClick={()=>addLanguage(item.language_id)}>
                    <ListItemIcon >
                      <FavoriteBorder />
                    </ListItemIcon>
                    <ListItemText primary={item.language}/>
                </ListItem>
              )
            })}
          </List >
        }
        {!likes[0] ?
          <div style={{width:'40%', border:'2px solid blue', textAlign:'center'}}>
            <h2>add your favorite languages!</h2>
          </div>
          :
          <List style={{display:'flex', flexWrap:'wrap', width:'40%', height:'20%'}}>
            {likes.map((item, index) => {
              return(
                <ListItem button key={index} style={{border:'2px solid green', width:'33%', height:'6.25%', textAlign:'initial'}} onClick={()=>removeLanguage(item.language_id)}>
                    <ListItemIcon >
                      <Favorite color='error'/>
                    </ListItemIcon>
                    <ListItemText primary={item.language}/>
                </ListItem>
              )
            })}
        </List>
        }
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { getLanguages, addFaveLanguages, check, getUser }
)(FaveLanguage);
import React, { useState, useEffect } from 'react';

// ACTIONS
import { getLanguages, getUserLanguages, editUserLanguages, check, getUser } from '../../../actions';

// STYLES
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const FaveLanguage = (props) => {
  const currentUser = useSelector(state => state.user);
  const languages = useSelector(state => state.languages);
  const userLanguages = useSelector(state => state.userLanguages);

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [dislikes2, setDislikes2] = useState([]);
  const [fave, setFave] = useState([]);

  useEffect(() => {
    props.getLanguages();
    props.check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.getUserLanguages(currentUser.profileid);
  }, [currentUser])

  useEffect(() => {
    setLikes(userLanguages)
    setDislikes(languages)
  }, [languages, userLanguages])

  useEffect(() => {
    const fullArray = languages.length+1
    likes.map(item => {
      return dislikes.splice(item.language_id-(fullArray-dislikes.length), 1)
    })
    setDislikes2(dislikes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes])

  useEffect(() => {
    setFave(likes.map(item => {
      return {language_id:item.language_id}
    }))
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
    props.editUserLanguages(currentUser.profileid, fave, props.history);
  }

  return(
    <form onSubmit={handleSubmit}>
      <div style={{display:'flex', justifyContent: 'center', width:'100%'}}>
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
      </div>
    </form>
  )
}

export default connect(
  null,
  { getLanguages, getUserLanguages, editUserLanguages, check, getUser }
)(FaveLanguage);
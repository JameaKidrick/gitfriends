import React, { useState, useEffect } from 'react';

// ACTIONS
import { getLanguages, addFaveLanguages, check } from '../../actions';

// STYLES
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const FaveLanguage = (props) => {
  const languages = useSelector(state => state.languages)

  const profileid = Number(localStorage.getItem('profileid'))
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState(useSelector(state => state.languages))
  const [fave, setFave] = useState([])

  useEffect(() => {
    props.getLanguages();
    props.check();
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
    props.addFaveLanguages(profileid, fave, props.history)
  }

  return(
    <div>
      <form onSubmit={handleSubmit} style={{display:'flex', justifyContent: 'space-between', width:'100%'}}>
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
  { getLanguages, addFaveLanguages, check }
)(FaveLanguage);
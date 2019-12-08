import React, { useState, useEffect } from 'react';

// ACTIONS
import { getLanguages, getUserLanguages, addFaveLanguages, check } from '../../../actions';

// STYLES
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { connect, useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const FaveLanguage = (props) => {
  const languages = useSelector(state => state.languages);
  const userLanguages = useSelector(state => state.userLanguages);

  console.log( 'LANGUAGES', languages)

  const profileid = Number(localStorage.getItem('profileid'));
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [dislikes2, setDislikes2] = useState([]);
  const [fave, setFave] = useState([]);
  // const [added, setAdded] = useState([]);
  // const [removed, setRemoved] = useState([]);

  useEffect(() => {
    props.getLanguages();
    props.getUserLanguages(profileid);
    props.check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLikes(userLanguages)
    setDislikes(languages)
  }, [languages, userLanguages])

   // ...state,
        // userLanguages: action.payload,
        // removedUserLanguages: state.removedUserLanguages.map(element => {
        //   console.log(state.removedUserLanguages)
        //   action.payload.reduce(function(idk, item){
        //     if(item.language_id !== element.language_id){
        //       return state.removedUserLanguages.push(element)
        //     }else{
        //       return false
        //     }
        //   })
        // }),
        // isFetching: false,
        // error: ''

  useEffect(() => {
    // const remove = likes.map(item => {
    //   const removeFromDislikes = dislikes.filter(element => {
    //     return !(element.language_id === item.language_id)
    //   })
    //   setDislikes(removeFromDislikes)
    //   return removeFromDislikes
    // })
    const remove = dislikes.map(item => {
      for(let i = 0; i < likes.length; i++){
        // console.log(item, likes[i])
        if(item.language_id !== likes[i].language_id){
          console.log('PUSHING', i, item)
          return dislikes2.push(item)
        }else{
          return item
        }
      }
    })
    console.log(remove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages])

  console.log(dislikes2)
  
  useEffect(() => {
    // likes.map(item => {
    //   setFave([...fave, {language_id:item.language_id}])
    //   return fave
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes])

  useEffect(() => {
    // COMPARE FAVE (NEW USER FAVE LANGUAGE LIST) TO USERLANGUAGES (OLD USER FAVE LANGUAGE LIST)
      // IF FAVE HAS LANGUAGE THAT IS NOT IN USERLANGUAGES, ADD TO 'ADDED' STATE
        // ADD MODEL TO ADD TO JXN TABLE
      // IF FAVE DOES NOT HAVE LANGUAGE THAT IS IN USERLANGUAGES, ADD TO 'REMOVED' STATE
        // REMOVE MODEL TO DELETE FROM JXN TABLE
      // OTHERWISE DO NOTHING
  }, [fave])

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
    // <div style={{border:'2px solid black', width:'50%'}}>
      <div onSubmit={handleSubmit} style={{display:'flex', justifyContent: 'center', width:'100%'}}>
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
        {/* <button type='submit'>Submit</button> */}
      </div>
    // </div>
  )
}

export default connect(
  null,
  { getLanguages, getUserLanguages, addFaveLanguages, check }
)(FaveLanguage);
import React, { useState, useEffect } from 'react';

// ACTIONS
import { getUserLanguages, getLanguages, addFaveLanguages, check } from '../../../actions';

// STYLES
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect, useSelector } from 'react-redux';

const EditFaveLanguage = (props) => {
  const languages = useSelector(state => state.languages);
  const userLanguages = useSelector(state => state.userLanguages);

  const profileid = localStorage.getItem('profileid');
  const profile = Number(localStorage.getItem('profileid'))
  const [state, setState] = useState(false)
  const [fave, setFave] = useState([])
  const [list, setList] = useState(languages)

  useEffect(() => {
    props.getUserLanguages(profileid);
    props.getLanguages();
    props.check();
  }, [])

  console.log('languages', languages)
  useEffect(() => {
    userLanguages.map(item => {
  //     // const lang = languages.filter(element => {
  //     //   // console.log('2', element)
  //     //   return element.language_id === item.language_id
  //     // })
  //     // fave.push(lang[0])

  //     // const allLang = languages.filter(element => {
  //     //   // console.log('1', element)
  //     //   return !(element.language_id === item.language_id)
  //     // })
  //     // list.push(allLang[0])
  //     languages.filter(element => {
  //       let lang = element.language_id === item.language_id
  //       let allLang = element.language_id !== item.language_id
  //       if(lang){
  //         return fave.push(lang[0])
  //         console.log('FAVE', fave)
  //       }else if(allLang){
  //         return list.push(allLang[0])
  //       }
  //     })
    languages.map(element => {
      if(element.language_id === item.language_id){
        setState(true)
      }
    })
    })
    
  }, ([userLanguages]))

  const handleChange = name => e => {
    setState({ ...state, [name]: e.target.checked });
    setFave([...fave, {language_id:name}])
    if(e.target.checked === false){
      const remove = fave.filter(element => {
        return element.language_id !== name 
      })
      setFave(remove)
    }
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    props.addFaveLanguages(profile, fave.slice(1), props.history)
  }
console.log(state)
  return(
    <div>
      Hello FaveLanguage Page!
      {/* <form onSubmit={handleSubmit}> */}
        
        <div style={{border:'2px solid black', display:'flex', flexWrap:'wrap',justifyContent:'space-between', width:'100%' }}>
          <div style={{border:'2px solid black', display:'flex', flexWrap:'wrap', width: '50%'}}>
            {languages.map((item, index) => {
              return(
                <div key={index}>
                  {console.log(state)}
                  <FormControlLabel
                    control={<Checkbox 
                      name={item.language_id}
                      icon={<FavoriteBorder />} 
                      checkedIcon={<Favorite />}
                      onChange={handleChange(item.language_id)}
                      checked={state.item}
                    />}
                    label={item.language}
                  />
                </div>
              )
            })}
            {/* {userLanguages.map((item, index) => {
              return(
                <div key={index}>
                  <FormControlLabel
                    control={<Checkbox 
                      name={item.language_id}
                      icon={<FavoriteBorder />} 
                      checkedIcon={<Favorite />}
                      onChange={handleChange(item.language_id)}
                      checked={faveState.item}
                    />}
                    label={item.language}
                  />
                </div>
              )
            })} */}
          </div>
        </div>
        <button type='submit'>Submit</button>
      {/* </form> */}
    </div>
  )
}

export default connect(
  null,
  { getUserLanguages, getLanguages, addFaveLanguages, check }
)(EditFaveLanguage);
import React, { useState, useEffect } from 'react';

// ACTIONS
import { getLanguages, addFaveLanguages, check } from '../../actions';

// STYLES
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect, useSelector } from 'react-redux';

const FaveLanguage = (props) => {
  const languages = useSelector(state => state.languages)

  const profile = Number(localStorage.getItem('profileid'))
  const [state, setState] = useState(true)
  const [fave, setFave] = useState([{}])

  useEffect(() => {
    props.getLanguages();
    props.check();
  }, [])

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

  return(
    <div>
      Hello FaveLanguage Page!
      <form onSubmit={handleSubmit}>
        {languages.map((item, index) => {
          return(
            <div key={index}>
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { getLanguages, addFaveLanguages, check }
)(FaveLanguage);
import React from 'react';
import { LanguageList } from './FaveLangList';

// STYLES
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const FaveLanguage = () => {
  return(
    <div>
      Hello FaveLanguage Page!
      {LanguageList.map(item => {
        return(
          <>
            <FormControlLabel
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />}
              label={item}
            />
          </>
        )
      })}
    </div>
  )
}

export default FaveLanguage;
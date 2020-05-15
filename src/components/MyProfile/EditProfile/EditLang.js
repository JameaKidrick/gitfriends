import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, Card, CardHeader, ListItem, ListItemText, ListItemIcon, Checkbox, Button, Divider, FormControlLabel, Grow, FormHelperText } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CheckBoxIcon from '@material-ui/icons/CheckBox'

// ACTIONS
import { check, getLanguages, getUserLanguages, getUser, editUserLanguages } from '../../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    border: '2px solid red',
    height: '500px',
    width: '350px'
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList(props) {
  const currentUser = useSelector(state => state.user)
  const userLanguages = useSelector(state => state.userLanguages);
  const languages = useSelector(state => state.languages);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);
  const [fave, setFave] = useState([]);
  const [checkSuccess, setCheckSuccess] = useState(false);

  const dispatch = useDispatch();

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  useEffect(() => {
    dispatch(check())
    dispatch(getUser())
    dispatch(getLanguages())
  }, []);
  
  useEffect(() => {
    dispatch(getUserLanguages(currentUser.userid))
  }, [currentUser]);

  useEffect(() => {
    setRight(userLanguages)
    setLeft(languages)
  }, [languages, userLanguages]);

  useEffect(() => {
    const fullArray = languages.length+1
    userLanguages.map(item => {
      return languages.splice(item.language_id-(fullArray-languages.length), 1)
    })
    setLeft(languages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLanguages])

  useEffect(() => {
    setFave(right.map(item => {
      return {language_id:item.language_id}
    }))
  }, [right])

  console.log('RIGHT', right, 'FAVE', fave)

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    setCheckSuccess(false);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setCheckSuccess(false);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    
    setCheckSuccess(false);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    
    setCheckSuccess(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editUserLanguages(currentUser.profileid, fave, setCheckSuccess));
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
              <FormControlLabel
                control={<Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />}
              />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.language}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grow direction="left" in={checkSuccess}><FormHelperText style={{color:'limeGreen'}}><CheckBoxIcon /></FormHelperText></Grow>
      <Grow direction="left" in={checkSuccess} {...(checkSuccess ? { timeout: 1500 } : {})}><FormHelperText style={{color:'limeGreen'}}>update successful!</FormHelperText></Grow>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item>{customList('Choices', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Chosen', right)}</Grid>
        <Button type='submit' variant='contained'>Submit</Button>
      </Grid>
    </form>
  );
}
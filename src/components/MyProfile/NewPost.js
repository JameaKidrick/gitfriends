import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// ACTIONS
import { createPost } from '../../actions';

// STYLES
import { TextField, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewPostModal = (props) => {
  // STYLES
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handlePostChange = e => {
    setPost({ ...post, [e.target.name]:e.target.value })
  }

  const handlePostSubmit = e => {
    e.preventDefault();
    props.createPost(post);
  }

  const cancelModal = () => {
    setPost({})
    setOpen(false)
  }

  console.log(post)

  return (
    <div>
      <Button type="button" onClick={handleOpen} variant='contained'>
        create a new post
      </Button>
      <Modal
        aria-labelledby="delete-modal-title"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <form onSubmit={handlePostSubmit}>
          <Typography variant='h5'>create post</Typography>
            <TextField
              name='title'
              fullWidth
              variant='outlined'
              placeholder='title'
              onChange={handlePostChange}
            />
            <TextField
              name='post'
              fullWidth
              multiline
              rows="4"
              variant='outlined'
              placeholder='post (required)'
              onChange={handlePostChange}
            />
            <Button type='submit' variant='contained'>create post</Button>
            <Button type='button' variant='contained' onClick={()=>cancelModal()}>cancel</Button>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect(
  null,
  { createPost }
)(NewPostModal);
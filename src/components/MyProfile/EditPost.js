import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// ACTIONS
import { getSpecificPost, editPost } from '../../actions';

// STYLES
import { TextField, Button, Typography } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

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

const EditPostModal = (props) => {
  const classes = useStyles();

  const isFetching = useSelector(state => state.isFetching);
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const [editPost, setEditPost] = useState({});

  useEffect(() => {
    props.getSpecificPost(props.postid, setPost)
  }, [open])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePostChange = e => {
    setEditPost({ ...editPost, [e.target.name]:e.target.value })
  }

  const handlePostSubmit = e => {
    e.preventDefault();
    props.editPost(props.postid, editPost, setOpen, props.userid);
  }

  const cancelModal = () => {
    setEditPost({})
    setOpen(false)
  }

  if(isFetching){
    return <EditIcon></EditIcon>;
  }

  return (
    <div>
      <EditIcon type="button" onClick={()=>handleOpen()} variant='contained'>
      </EditIcon>
      <Modal
        aria-labelledby="edit-post-modal-title"
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
            <Typography variant='h5'>edit post</Typography>
            <TextField
              name='title'
              fullWidth
              autoFocus
              variant='outlined'
              defaultValue={post.title}
              onChange={handlePostChange}
            />
            <TextField
              name='post'
              fullWidth
              multiline
              rows="4"
              variant='outlined'
              defaultValue={post.post}
              onChange={handlePostChange}
            />
            <Button type='submit' variant='contained'>edit post</Button>
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
  { getSpecificPost, editPost }
)(EditPostModal);
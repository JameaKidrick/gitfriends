import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// ACTIONS
import { deletePost } from '../../actions';

// STYLES
import { TextField, Button, FormLabel } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

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

const DeletePostModal = (props) => {
  const userid = Number(localStorage.getItem('userid'));
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelModal = () => {
    setOpen(false)
  }

  const deletePost = () => {
    props.deletePost(props.postid, setOpen, props.userid)
  }

  return (
    <div>
      <DeleteIcon type="button" onClick={handleOpen} variant='contained'>
        create a new post
      </DeleteIcon>
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
            <h2>are you sure you want to delete this post?</h2>
            <Button type='button' variant='contained' onClick={()=>deletePost()}>delete post</Button>
            <Button type='button' variant='contained' onClick={()=>cancelModal()}>cancel</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect(
  null,
  { deletePost }
)(DeletePostModal);
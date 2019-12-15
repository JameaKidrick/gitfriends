import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

// ACTIONS
import { deleteUser, getUser } from '../../actions';

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

const DeleteProfileModal = (props) => {
  // const userid = Number(localStorage.getItem('userid'));
  // STYLES
  const classes = useStyles();

  const currentUser = useSelector(state => state.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.getUser();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelModal = () => {
    setOpen(false)
  }

  const deleteProfile = () => {
    props.deleteUser(currentUser.userid, props.history)
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        delete profile
      </button>
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
            <h2>are you sure you want to delete your profile?</h2>
            <p>you will not be able to undo this and your friends will miss you... a lot...</p>
            <Button onClick={()=>deleteProfile()}>yes, delete</Button>
            <Button onClick={()=>cancelModal()}>no, i'll stay</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default connect(
  null,
  { deleteUser, getUser }
)(DeleteProfileModal);
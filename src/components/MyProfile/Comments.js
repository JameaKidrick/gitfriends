import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

// ACTIONS
import { editComment, deleteComment, getUser } from "../../actions";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Avatar, TextField, Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  helper: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary
  }
}));

const Comments = (props) => {
  // STYLE
  const classes = useStyles();
  
  const currentUser = useSelector(state => state.user);
  const comments = useSelector(state => state.postComments);

  const [expanded2, setExpanded2] = useState(false);
  const [editComment, setEditComment] = useState({});
  const [commentid, setCommentid] = useState(0);
  const [postid, setPostid] = useState(0);

  const sortedComments = comments.sort((a, b) => {
    return a.comment_id - b.comment_id
  });

  useEffect(() => {
    props.getUser()
  }, [])

  const handleEditingState = editPanel => (e, isExpanded) => {
    setExpanded2(isExpanded ? editPanel : false);
  };

  const handleEditCommentChange = e => {
    setEditComment({comment:e.target.value});
    setCommentid(Number(e.target.name));
  };

  const handleEditCommentSubmit = e => {
    e.preventDefault();
    props.editComment(commentid, editComment, postid, setExpanded2);
  }

  const editing = (comment) => {
    setPostid(comment.post_id)
    expanded2 === `editPanel${comment.comment_id}` ? setExpanded2(false) : setExpanded2(`editPanel${comment.comment_id}`)
  }

  const deleteComment = (comment) => {
    props.deleteComment(comment.comment_id, comment.post_id);
  }

  const formatDate = (date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    const monthNames = [
      "january", "february", "march",
      "april", "may", "june", "july",
      "august", "september", "october",
      "november", "december"
    ];
    const publishDate = new Date(date)
    return `${days[publishDate.getDay()]}, ${monthNames[publishDate.getMonth()]} ${publishDate.getDate()}, ${publishDate.getFullYear()}`
  }

  return (
    <div className="commentsContainer">
      {!comments[0] ? (
        <div>be the first to comment</div>
      ) : (
        <div>
          {sortedComments.map((element, commentIndex) => {
            if (!element) {
              return <div>be the first to comment!</div>;
            } else {
              return (
                <div
                  key={commentIndex}
                  style={{ width: "570px", border: "1px solid lightGrey" }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Avatar src={element.avatar} />
                    {element.user_id === currentUser.userid ? (
                      <div
                        style={{
                          width: "15%",
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <EditIcon
                          onClick={() =>
                            editing(element)
                          }
                        />
                        <DeleteIcon onClick={()=>deleteComment(element)} />
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                  <p>{element.username}</p>
                  <p className={classes.helper}>
                    {formatDate(element.created_at)}
                  </p>
                  <ExpansionPanel
                    expanded={expanded2 === `editPanel${element.comment_id}`}
                    onChange={handleEditingState(
                      `editPanel${element.comment_id}`
                    )}
                  >
                    {!(expanded2 === `editPanel${element.comment_id}`) && (
                      <p>{element.comment}</p>
                    )}
                    <ExpansionPanelDetails>
                      <form onSubmit={handleEditCommentSubmit}>
                        <TextField
                          name={element.comment_id}
                          defaultValue={element.comment}
                          onChange={handleEditCommentChange}
                        />
                        <Button type="submit" variant="contained">
                          edit comment
                        </Button>
                      </form>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default connect(null,
  { editComment, deleteComment, getUser }
)(Comments);

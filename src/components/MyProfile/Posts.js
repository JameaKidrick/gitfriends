import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

// ACTIONS
import { getUserPosts, getPostComments, createComment } from "../../actions";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15)
  },
  normalText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary
  },
  helper: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary
  }
}));

const Posts = props => {
  // STYLE
  const classes = useStyles();

  const posts = useSelector(state => state.userPosts);
  const comments = useSelector(state => state.postComments);
  const userid = Number(localStorage.getItem("userid"));
  const [expanded, setExpanded] = useState(false);
  const [postid, setPostid] = useState(0);
  const [makeComment, setMakeComment] = useState({});

  const sortedComments = comments.sort((a, b) => {
    return a.comment_id - b.comment_id
  })

  useEffect(() => {
    props.getUserPosts(userid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(expanded){
      props.getPostComments(expanded.replace('panel', ''))
    }
  }, [expanded])

  const handleChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const handleCommentChange = e => {
    setMakeComment({comment:e.target.value})
    setPostid(Number(e.target.name))
  };

  // console.log(makeComment, Number(postid))

  const handleSubmit = e => {
    e.preventDefault()
    props.createComment(postid, makeComment)
    props.getPostComments(postid)
  };

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
    <div className="postsContainer">
      <Card>
        {posts.map((item, postIndex) => {
          return (
            <div
              key={postIndex}
              style={{
                border: "2px solid black",
                width: "50%",
                margin: "0 auto"
              }}
            >
              <CardHeader title={item.title} subheader={`published: ${formatDate(item.created_at)}`} />
              <CardContent>
                <Typography className={classes.secondaryHeading}>
                  {item.post}
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                  <TextField 
                    placeholder='make a comment'
                    variant='outlined'
                    fullWidth
                    onChange={handleCommentChange}
                    name={item.post_id}
                  />
                  <Button type='submit'>submit</Button>
                </form>
                <ExpansionPanel
                  expanded={expanded === `panel${item.post_id}`}
                  onChange={handleChange(`panel${item.post_id}`)}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    {!(expanded === `panel${item.post_id}`) && (
                      <Typography className={classes.normalText}>
                        see comments
                      </Typography>
                    )}
                    {expanded === `panel${item.post_id}` && (
                      <Typography className={classes.normalText}>
                        hide comments
                      </Typography>
                    )}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {!comments[0] ? 
                    <div>
                      be the first to comment
                    </div> 
                    : 
                    <div>
                      {sortedComments.map((element, commentIndex) => {
                        if(!element){
                          return(
                            <div>
                              be the first to comment!
                            </div>
                          )
                        }else{
                          return(
                            <div key={commentIndex} style={{border:'1px solid lightGrey'}}>
                              <Avatar 
                                src={element.avatar}
                              />
                              <p>
                                {element.username}
                              </p>
                              <p className={classes.helper}>
                                {formatDate(element.created_at)}
                              </p>
                              <p>
                                {element.comment}
                              </p>
                            </div>
                          )
                        }
                      })}
                    </div>}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </CardContent>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default connect(null, 
  { getUserPosts, getPostComments, createComment }
)(Posts);

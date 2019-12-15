import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

// COMPONENTS
import Comments from './Comments';
import NewPost from './NewPost';
import EditPost from "./EditPost";

// ACTIONS
import { getUserPosts, getPostComments, createComment, getUser } from "../../actions";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { TextField, Button } from "@material-ui/core";
import DeletePost from "./DeletePost";

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
  }
}));

const Posts = props => {
  // STYLE
  const classes = useStyles();

  const currentUser = useSelector(state => state.user);
  const posts = useSelector(state => state.userPosts);
  const error = useSelector(state => state.error);
  const [expanded, setExpanded] = useState(false);
  const [postid, setPostid] = useState(0);
  const [makeComment, setMakeComment] = useState({});

  const sortedPosts = posts.sort((a, b) => {
    return b.post_id - a.post_id
  })

  useEffect(() => {
    props.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    props.getUserPosts(currentUser.userid);
  }, [currentUser])

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

  const handleCommentSubmit = e => {
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
      <NewPost />
      {error ? 
        (<Typography variant='h5'>you don't have any posts yet</Typography>)
        :
        sortedPosts.map((item, postIndex) => {
          return (
            <div
              key={postIndex}
              style={{
                border: "2px solid black",
                width: "50%",
                margin: "0 auto"
              }}
            >
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <CardHeader title={item.title} subheader={`published: ${formatDate(item.created_at)}`} />
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <EditPost postid={item.post_id} />
                  <DeletePost postid={item.post_id} />
                </div>
              </div>
              <CardContent>
                <Typography className={classes.secondaryHeading}>
                  {item.post}
                </Typography>
                <br />
                <form onSubmit={handleCommentSubmit}>
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
                    <Comments />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </CardContent>
            </div>
          );
        })}
    </div>
  );
};

export default connect(null, 
  { getUserPosts, getPostComments, createComment, getUser }
)(Posts);

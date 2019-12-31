import { axiosWithAuth } from "../utils/axiosWithAuth";

// ACTION TYPES
export const START_FETCHING = "START_FETCHING";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const CHECK_SUCCESS = "CHECK_SUCCESS";
export const CHECK_FAILURE = "CHECK_FAILURE";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const FETCHUSER_SUCCESS = "FETCHUSER_SUCCESS";
export const FETCHUSERWITHOUTPROFILEID_SUCCESS = "FETCHUSERWITHOUTPROFILEID_SUCCESS";
export const FETCHUSERS_SUCCESS = "FETCHUSERS_SUCCESS";
export const FETCHPROFILES_SUCCESS = "FETCHPROFILES_SUCCESS";
export const PROFILECREATED_SUCCESS = "PROFILECREATED_SUCCESS";
export const FETCHLANGUAGES_SUCCESS = "FETCHLANGUAGES_SUCCESS";
export const ADDLANGUAGES_SUCCESS = "ADDLANGUAGES_SUCCESS";
export const GETUSERPROFILE_SUCCESS = "GETUSERPROFILE_SUCCESS";
export const EDITPROFILE_SUCCESS = "EDITPROFILE_SUCCESS";
export const FETCHUSERLANGUAGES_SUCCESS = "FETCHUSERLANGUAGES_SUCCESS";
export const EDITFAVELANGUAGES_SUCCESS = "EDITFAVELANGUAGES_SUCCESS";
export const EDITUSER_SUCCESS = "EDITUSER_SUCCESS";
export const FETCHFRIENDREQUESTS_SUCCESS = "FETCHFRIENDREQUESTS_SUCCESS";
export const RESPONDTOREQUEST_SUCCESS = "RESPONDTOREQUEST_SUCCESS";
export const FETCHFRIENDSTATUSES_SUCCESS = "FETCHFRIENDSTATUSES_SUCCESS";
export const FETCHFRIENDS_SUCCESS = "FETCHFRIENDS_SUCCESS";
export const DELETEFRIEND_SUCCESS = "DELETEFRIEND_SUCCESS";
export const SENDFRIENDREQUEST_SUCCESS = "SENDFRIENDREQUEST_SUCCESS";
export const DELETEFRIENDREQUEST_SUCCESS = "DELETEFRIENDREQUEST_SUCCESS";
export const FETCHUSERPOSTS_SUCCESS = "FETCHUSERPOSTS_SUCCESS";
export const FETCHPOSTCOMMENTS_SUCCESS = "FETCHPOSTCOMMENTS_SUCCESS";
export const CREATECOMMENT_SUCCESS = "CREATECOMMENT_SUCCESS";
export const EDITCOMMENT_SUCCESS = "EDITCOMMENT_SUCCESS";
export const DELETECOMMENT_SUCCESS = "DELETECOMMENT_SUCCESS";
export const FETCHPOST_SUCCESS = "FETCHPOST_SUCCESS";
export const CREATEPOST_SUCCESS = "CREATEPOST_SUCCESS";
export const EDITPOST_SUCCESS = "EDITPOST_SUCCESS";
export const DELETEPOST_SUCCESS = "DELETEPOST_SUCCESS";

// ACTION CREATORS
export const getUser = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get("/users/user")
    .then(response => {
      dispatch({ type: FETCHUSER_SUCCESS, payload: response.data });
    })
    .catch(error => {
      if(304){
        return false
      }
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const getUserAfterRegister = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get("/users/create")
    .then(response => {
      dispatch({ type: FETCHUSERWITHOUTPROFILEID_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const getAllUsers = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get("/users")
    .then(response => {
      dispatch({ type: FETCHUSERS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const getAllProfilesWithUsers = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/profiles/all`)
    .then(response => {
      dispatch({ type: FETCHPROFILES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
};

export const registerUser = (data, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post("/auth/register", data)
    .then(response => {
      dispatch({ type: REGISTER_SUCCESS });
      console.log(response)
      localStorage.setItem('token', response.data.token);
      history.push(`/register/${response.data.userid}/createprofile`);
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data });
    });
};

export const loginUser = (credentials, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post("/auth/login", credentials)
    .then(response => {
      dispatch({ type: LOGIN_SUCCESS });
      console.log(response)
      localStorage.setItem('token', response.data.token);
      history.push(`/myprofile/${response.data.userid}`);
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const check = () => dispatch => {
  if(localStorage.getItem('token')) {
    dispatch({ type: CHECK_SUCCESS });
  } else {
    dispatch({ type: CHECK_FAILURE });
  }
};

export const alerts = () => dispatch => {
  // axiosWithAuth()
  //   .get()
  //   .then(response => {
  //     console.log('alerts', response.data)
  //     localStorage.setItem('alerts', response.data.length)
  //     if(localStorage.getItem('alerts') > 0){
  //       dispatch({ type: ALERT_SUCCESS });
  //     }
  //   })
}

export const logoutUser = () => dispatch => {
  dispatch({ type: START_FETCHING });
  dispatch({ type: LOGOUT_SUCCESS });
  localStorage.removeItem('token');
};

export const createProfile = (id, profile, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post(`/users/${id}/profile`, profile)
    .then(response => {
      dispatch({ type: PROFILECREATED_SUCCESS });
      history.push(`/register/${id}/createprofile2`);
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const getLanguages = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get("/fave")
    .then(response => {
      console.log(response)
      dispatch({ type: FETCHLANGUAGES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const addFaveLanguages = (id, fave, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  console.log('ACTION', id, fave)
  fave.forEach(element => {
    axiosWithAuth()
      .post(`/profiles/${id}/fave`, element)
      .then(response => {
        dispatch({ type: ADDLANGUAGES_SUCCESS, payload: response.data });
        history.push(`/myprofile/${id}`);
      })
      .catch(error => {
        dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
      });
  });
};

export const getUserProfile = (id, setProfile, setUser) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/profiles/${id}/full`)
    .then(response => {
      dispatch({ type: GETUSERPROFILE_SUCCESS, payload: response.data });
      setProfile(response.data.profile);
      setUser(response.data.user);
    })
    .catch(error => {
      if(304){
        return false
      }
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const editProfile = (profileId, info, setCheckSuccess) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/profiles/${profileId}`, info)
    .then(response => {
      dispatch({ type: EDITPROFILE_SUCCESS, payload: response.data });
      setCheckSuccess(true)
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const getUserLanguages = profileid => dispatch => {
  dispatch({ type: START_FETCHING });
  // console.log(profileid)
  axiosWithAuth()
    .get(`/profiles/${profileid}/fave`)
    .then(response => {
      // console.log('GETUSERLANGUAGES ACTION', response)
      dispatch({ type: FETCHUSERLANGUAGES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const editUserLanguages = (profileid, fave, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  console.log('ACTIONS', fave)
  fave.forEach(element => {
    axiosWithAuth()
      .post(`/profiles/${profileid}/updateFave`, element)
      .then(response => {
        dispatch({ type: EDITFAVELANGUAGES_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
      });
  });
};

export const editUser = (userid, info, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/users/${userid}`, info)
    .then(response => {
      dispatch({ type: EDITUSER_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const deleteUser = (userid, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .delete(`/users/${userid}`)
    .then(response => {
      localStorage.removeItem("token");
      history.push("/");
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const getFriendRequests = (userid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/users/${userid}/requests`)
    .then(response => {
      dispatch({ type: FETCHFRIENDREQUESTS_SUCCESS, payload: response.data })
    })
    .catch(error => { 
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const respondToFriendRequest = (userid, requestid, decision) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/users/${userid}/requests/${requestid}`, decision)
    .then(response => {
      dispatch({ type: RESPONDTOREQUEST_SUCCESS })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
}

// CAN DELETE???
export const findFriendshipStatus = (userid, friendid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/users/${userid}/status/${friendid}`)
    .then(response => {
      // console.log(response.data)
      dispatch({ type: FETCHFRIENDSTATUSES_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
}

export const getUsersFriends = (userid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/users/${userid}/friends`)
    .then(response => {
      dispatch({ type: FETCHFRIENDS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
}

export const deleteFriend = (requestid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .delete(`/friends/${requestid}`)
    .then(response => {
      dispatch({ type: DELETEFRIEND_SUCCESS })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const sendFriendRequest = (friendid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
  .post(`/users/${friendid}/requests`)
  .then(response => {
    dispatch({ type: SENDFRIENDREQUEST_SUCCESS })
  })
  .catch(error => {
    dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
  });
}

export const deleteFriendRequest = (requestid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .delete(`/requests/${requestid}`)
    .then(response => {
      dispatch({ type: DELETEFRIENDREQUEST_SUCCESS })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const getUserPosts = (userid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/users/${userid}/posts`)
    .then(response => {
      // console.log(response.data)
      dispatch({ type: FETCHUSERPOSTS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      console.log(error.response)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.message });
    });
}

export const getPostComments = (postid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/posts/${postid}/comments`)
    .then(response => {
      dispatch({ type: FETCHPOSTCOMMENTS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const createComment = (postid, comment) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post(`/posts/${postid}/comments`, comment)
    .then(response => {
      dispatch({ type: CREATECOMMENT_SUCCESS, payload: response.data })
      dispatch(getPostComments(postid))
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const editComment = (commentid, comment, postid, setExpanded2) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/comments/${commentid}`, comment)
    .then(response => {
      dispatch({ type: EDITCOMMENT_SUCCESS, payload: response.data })
      dispatch(getPostComments(postid))
      setExpanded2(false)
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const deleteComment = (commentid, postid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .delete(`/comments/${commentid}`)
    .then(response => {
      dispatch({ type: DELETECOMMENT_SUCCESS, payload: response.data })
      dispatch(getPostComments(postid))
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const getSpecificPost = (postid, setPost) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/posts/${postid}`)
    .then(response => {
      setPost(response.data)
      dispatch({ type: FETCHPOST_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const createPost = (post, setOpen, userid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post(`posts`, post)
    .then(response => {
      dispatch({ type: CREATEPOST_SUCCESS, payload: response.data })
      setOpen(false)
      dispatch(getUserPosts(userid));
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const editPost = (postid, post, setOpen, userid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/posts/${postid}`, post)
    .then(response => {
      dispatch({ type: EDITPOST_SUCCESS, payload: response.data })
      setOpen(false)
      dispatch(getUserPosts(userid));
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}

export const deletePost = (postid, setOpen, userid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .delete(`/posts/${postid}`)
    .then(response => {
      dispatch({ type: DELETEPOST_SUCCESS, payload: response.data })
      setOpen(false)
      dispatch(getUserPosts(userid));
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
}
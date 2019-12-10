import { axiosWithAuth } from "../utils/axiosWithAuth";

// ACTION TYPES
export const START_FETCHING = "START_FETCHING";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const CHECK_SUCCESS = "CHECK_SUCCESS";
export const CHECK_FAILURE = "CHECK_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const FETCHUSERS_SUCCESS = "FETCHUSERS_SUCCESS";
export const FETCHPROFILES_SUCCESS = "FETCHPROFILES_SUCCESS";
export const PROFILECREATED_SUCCESS = "PROFILECREATED_SUCCESS";
export const FETCHLANGUAGES_SUCCESS = "FETCHLANGUAGES_SUCCESS";
export const ADDLANGUAGES_SUCCESS = "ADDLANGUAGES_SUCCESS";
export const GETUSERPROFILE_SUCCESS = "GETUSERPROFILE_SUCCESS";
export const EDITPROFILE_SUCCESS = "EDITPROFILE_SUCCESS";
export const FETCHUSERLANGUAGES_SUCCESS = "FETCHUSERLANGUAGES_SUCCESS";
export const EDITFAVELANGUAGES_SUCCESS = "EDITFAVELANGUAGES_SUCCESS";
export const FETCHFRIENDREQUESTS_SUCCESS = "FETCHFRIENDREQUESTS_SUCCESS";
export const FETCHFRIENDSTATUSES_SUCCESS = "FETCHFRIENDSTATUSES_SUCCESS";

// ACTION CREATORS
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
    .get("/profiles/all")
    .then(response => {
      dispatch({ type: FETCHPROFILES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error.response);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const registerUser = (data, history) => dispatch => {
  console.log("MADE IT TO ACTION");
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post("/auth/register", data)
    .then(response => {
      dispatch({ type: REGISTER_SUCCESS });
      console.log("RESPONSE", response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userid", response.data.userid);
      localStorage.setItem("username", response.data.username);
      history.push(`/register/${response.data.id}/createprofile`);
    })
    .catch(error => {
      console.log("ERROR", error.response.data.error);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data });
    });
};

export const loginUser = (credentials, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post("/auth/login", credentials)
    .then(response => {
      dispatch({ type: LOGIN_SUCCESS });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userid", response.data.userid);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("profileid", response.data.profileid);
      history.push("/");
    })
    .catch(error => {
      console.log(error.response);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const check = () => dispatch => {
  if (localStorage.getItem("token")) {
    dispatch({ type: CHECK_SUCCESS });
  } else {
    dispatch({ type: CHECK_FAILURE });
  }
};

export const logoutUser = () => dispatch => {
  dispatch({ type: START_FETCHING });
  dispatch({ type: LOGOUT_SUCCESS });
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("username");
  localStorage.removeItem("profileid");
};

export const createProfile = (id, profile, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post(`/users/${id}/profile`, profile)
    .then(response => {
      dispatch({ type: PROFILECREATED_SUCCESS });
      localStorage.setItem("profileid", response.data.profile_id);
      history.push(`/register/${id}/createprofile2`);
    })
    .catch(error => {
      console.log(error.response);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const getLanguages = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get("/fave")
    .then(response => {
      dispatch({ type: FETCHLANGUAGES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error.response.data.error);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const addFaveLanguages = (id, fave, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  fave.forEach(element => {
    axiosWithAuth()
      .post(`/profiles/${id}/fave`, element)
      .then(response => {
        dispatch({ type: ADDLANGUAGES_SUCCESS, payload: response.data });
        history.push(`/myprofile/${id}`);
      })
      .catch(error => {
        console.log(error.response.data.error);
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
      console.log(error.response.data.error);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const editProfile = (profileId, info) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/profiles/${profileId}`, info)
    .then(response => {
      dispatch({ type: EDITPROFILE_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error.response.data.error);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const getUserLanguages = profileid => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/profiles/${profileid}/fave`)
    .then(response => {
      dispatch({ type: FETCHUSERLANGUAGES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log(error.response.data.error);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const editUserLanguages = (profileid, fave, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  fave.forEach(element => {
    axiosWithAuth()
      .post(`/profiles/${profileid}/updateFave`, element)
      .then(response => {
        dispatch({ type: EDITFAVELANGUAGES_SUCCESS, payload: response.data });
      })
      .catch(error => {
        console.log(error.response.data.error);
        dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
      });
  });
};

export const editUser = (userid, info, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/users/${userid}`, info)
    .then(response => {
      console.log(response);
      // dispatch({ type: EDITUSER_SUCCESS, payload: response.data })
    })
    .catch(error => {
      console.log(error.response);
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};

export const deleteUser = (userid, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .delete(`/users/${userid}`)
    .then(response => {
      console.log(response, history);
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("profileid");
      history.push("/");
    })
    .catch(error => {
      console.log(error);
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
      console.log(error);
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
}

export const respondToFriendRequest = (userid, requestid, decision) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .put(`/users/${userid}/requests/${requestid}`, decision)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
}

export const findFriendshipStatus = (userid, friendid) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get(`/users/${userid}/status/${friendid}`)
    .then(response => {
      console.log(response.data)
      dispatch({ type: FETCHFRIENDSTATUSES_SUCCESS, payload: response.data })
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
}

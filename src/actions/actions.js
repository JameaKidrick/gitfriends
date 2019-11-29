import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const CHECK_SUCCESS = 'CHECK_SUCCESS';
export const CHECK_FAILURE = 'CHECK_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const FETCHUSERS_SUCCESS = 'FETCHUSERS_SUCCESS';
export const FETCHPROFILES_SUCCESS = 'FETCHPROFILES_SUCCESS';
export const PROFILECREATED_SUCCESS = 'PROFILECREATED_SUCCESS';
export const FETCHLANGUAGES_SUCCESS = 'FETCHLANGUAGES_SUCCESS';
export const ADDLANGUAGES_SUCCESS = 'ADDLANGUAGES_SUCCESS';
export const GETUSERPROFILE_SUCCESS = 'GETUSERPROFILE_SUCCESS';


// ACTION CREATORS
export const getAllUsers = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get('/users')
    .then(response => {
      dispatch({ type: FETCHUSERS_SUCCESS, payload: response.data})
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const getSingleUser = () => dispatch => {
//   dispatch({ type: START_FETCHING });
//   axiosWithAuth()
//     .get('/profiles')
//     .then(response => {
//     })
//     .catch(error => {
//       dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
//     })
}

export const getAllProfilesWithUsers = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get('/profiles/all')
    .then(response => {
      // return response.data.map(item => {
      //   axiosWithAuth()
      //   .get(`/profiles/${item.user_id}/full`)
      //   .then(responseProfile => {
      //     dispatch({ type: MAPPROFILES_SUCCESS, payload: responseProfile.data})
      //   })
      // })
      console.log(response.data)
      dispatch({ type: FETCHPROFILES_SUCCESS, payload: response.data})
    })
    .catch(error => {
      console.log(error.response)
      // dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const registerUser = (credentials, history) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .post('/auth/register', credentials)
    .then(response => {
      dispatch({ type: REGISTER_SUCCESS})
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userid', response.data.id)
      localStorage.setItem('username', response.data.username)
      history.push(`/register/${response.data.id}/createprofile`)
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const loginUser = (credentials, history) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .post('/auth/login', credentials)
    .then(response => {
      dispatch({ type: LOGIN_SUCCESS})
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userid', response.data.id)
      localStorage.setItem('username', response.data.username)
      history.push('/')
    })
    .catch(error => {
      console.log(error.response)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const check = () => dispatch => {
  if(localStorage.getItem('token')){
    dispatch({ type: CHECK_SUCCESS })
  }else{
    dispatch({ type: CHECK_FAILURE })
  }
}

export const logoutUser = () => dispatch => {
  dispatch({ type: START_FETCHING })
  dispatch({ type: LOGOUT_SUCCESS})
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('username')
    localStorage.removeItem('profileid')
}

export const createProfile = (id, profile, history) => dispatch => {
  dispatch({ type: START_FETCHING })
  console.log('ACTION', profile, 'ID', id)
  axiosWithAuth()
    .post(`/users/${id}/profile`, profile)
    .then(response => {
      dispatch({ type: PROFILECREATED_SUCCESS })
      localStorage.setItem('profileid', response.data.profile_id)
      history.push(`/register/${id}/createprofile2`)
    })
    .catch(error => {
      console.log(error.response)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const getLanguages = () => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get('/fave')
    .then(response => {
      dispatch({ type: FETCHLANGUAGES_SUCCESS, payload: response.data })
    })
    .catch(error => {
      console.log(error.response.data.error)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const addFaveLanguages = (id, fave, history) => dispatch => {
  dispatch({ type: START_FETCHING })
  fave.forEach(element => {
    axiosWithAuth()
      .post(`/profiles/${id}/fave`, element)
      .then(response => {
        dispatch({ type: ADDLANGUAGES_SUCCESS, payload: response.data })
        history.push(`/myprofile/${id}`)
      })
      .catch(error => {
        console.log(error.response.data.error)
        dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
      })
  })
}

export const getUserProfile = (id, setProfile, setUser) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get(`/profiles/${id}/full`)
    .then(response => {
      dispatch({ type: GETUSERPROFILE_SUCCESS, payload: response.data })
      console.log(response.data.profile)
      setProfile(response.data.profile)
      setUser(response.data.user)
    })
}
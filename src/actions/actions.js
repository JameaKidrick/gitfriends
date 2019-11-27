import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const FETCHUSERS_SUCCESS = 'FETCHUSERS_SUCCESS';
export const MAPPROFILES_SUCCESS = 'MAPPROFILES_SUCCESS';

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
    .get('/users')
    .then(response => {
      return response.data.map(item => {
        axiosWithAuth()
        .get(`/profiles/${item.user_id}/full`)
        .then(responseProfile => {
          dispatch({ type: MAPPROFILES_SUCCESS, payload: responseProfile.data})
        })
      })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
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
      history.push('/')
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

export const logoutUser = () => dispatch => {
  dispatch({ type: START_FETCHING })
  dispatch({ type: LOGOUT_SUCCESS})
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('username')
}
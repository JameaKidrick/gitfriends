import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
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
      console.log(error.response.data.error)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const getSingleUser = () => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .get('/profiles')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response.data.error)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
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
          dispatch({ type: MAPPROFILES_SUCCESS, payload: responseProfile.data, id: [responseProfile.data.user.user_id]})
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
      localStorage.setItem('userid', response.data.ID)
      localStorage.setItem('username', response.data.username)
      history.push('/')
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}
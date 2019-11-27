import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

// ACTION CREATORS
export const getUsers = () => {
  dispatchEvent({ type: START_FETCHING });
  axiosWithAuth()
    .get('/users')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log('ERROR', error)
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
      console.log(error)
      dispatch({ type: FETCH_FAILURE, payload: error.response })
    })
}
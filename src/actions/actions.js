import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES

// ACTION CREATORS
export const getUsers = () => {
  dispatchEvent({ type: START_FETCHING });
  axiosWithAuth()
    .get('/users')
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}
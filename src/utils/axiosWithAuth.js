import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:5556/api',
    headers: {
      Authorization: token
    }
  })
}

// https://gitfriendsdb.herokuapp.com/api
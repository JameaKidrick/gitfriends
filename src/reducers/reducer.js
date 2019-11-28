import { START_FETCHING, FETCH_FAILURE, REGISTER_SUCCESS, LOGIN_SUCCESS, CHECK_SUCCESS, CHECK_FAILURE, LOGOUT_SUCCESS, FETCHUSERS_SUCCESS, MAPPROFILES_SUCCESS, PROFILECREATED_SUCCESS } from '../actions';


export const initialState = {
  users: [],
  profiles: [],
  loggedIn: false,
  isFetching: false,
  error: ''
}

export const reducer = (state = initialState, action) => {
  switch (action.type){
    case START_FETCHING:
      return{
        ...state,
        isFetching: true,
        error: ''
      };
    case FETCH_FAILURE:
      return{
        ...state,
        isFetching: false,
        error: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case CHECK_SUCCESS:
    case PROFILECREATED_SUCCESS:
      return{
        ...state,
        isFetching: false,
        error: '',
        loggedIn: true
      };
    case CHECK_FAILURE:
    case LOGOUT_SUCCESS:
      return{
        ...state,
        isFetching: false,
        error: '',
        loggedIn: false
      };
    case FETCHUSERS_SUCCESS:
      return{
        ...state,
        users: action.payload,
        isFetching: false,
        error: ''
      };
    case MAPPROFILES_SUCCESS:
      return {
        ...state.profiles,
        profiles: [...state.profiles, action.payload],
        isFetching: false,
        error: '',
        loggedIn: true
      };
    default:
      return state
  }
}
import { START_FETCHING, FETCH_FAILURE, REGISTER_SUCCESS, LOGIN_SUCCESS, CHECK_SUCCESS, CHECK_FAILURE, ALERT_SUCCESS, LOGOUT_SUCCESS, EDITFAVELANGUAGES_SUCCESS, EDITPROFILE_SUCCESS, FETCHUSER_SUCCESS, FETCHUSERWITHOUTPROFILEID_SUCCESS, FETCHUSERS_SUCCESS, FETCHPROFILES_SUCCESS, PROFILECREATED_SUCCESS, FETCHLANGUAGES_SUCCESS, ADDLANGUAGES_SUCCESS, GETUSERPROFILE_SUCCESS, FETCHUSERLANGUAGES_SUCCESS, EDITUSER_SUCCESS,FETCHFRIENDREQUESTS_SUCCESS, RESPONDTOREQUEST_SUCCESS, FETCHFRIENDSTATUSES_SUCCESS, FETCHFRIENDS_SUCCESS, SENDFRIENDREQUEST_SUCCESS,
DELETEFRIENDREQUEST_SUCCESS, FETCHUSERPOSTS_SUCCESS, FETCHPOSTCOMMENTS_SUCCESS, CREATECOMMENT_SUCCESS, EDITCOMMENT_SUCCESS, DELETECOMMENT_SUCCESS, FETCHPOST_SUCCESS, CREATEPOST_SUCCESS, EDITPOST_SUCCESS, DELETEPOST_SUCCESS  } from '../actions';

export const initialState = {
  user: [],
  userwithoutprofile: [],
  users: [],
  profiles: [{}],
  userProfile:{},
  languages: [],
  userLanguages: [],
  requests:[],
  friends: [],
  userPosts: [],
  postComments: [],
  alerts: false,
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
    case ADDLANGUAGES_SUCCESS:
    case RESPONDTOREQUEST_SUCCESS:
    case FETCHFRIENDSTATUSES_SUCCESS:
    case SENDFRIENDREQUEST_SUCCESS:
    case DELETEFRIENDREQUEST_SUCCESS:
    case EDITFAVELANGUAGES_SUCCESS:
    case EDITPROFILE_SUCCESS:
    case EDITUSER_SUCCESS:
    case CREATECOMMENT_SUCCESS:
    case EDITCOMMENT_SUCCESS:
    case DELETECOMMENT_SUCCESS:
    case FETCHPOST_SUCCESS:
    case CREATEPOST_SUCCESS:
    case EDITPOST_SUCCESS:
    case DELETEPOST_SUCCESS:
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
    case ALERT_SUCCESS:
      return{
        ...state,
        isFetching: false,
        error: '',
        loggedIn: true,
        alerts: true
      };
    case FETCHUSER_SUCCESS:
      return{
        ...state,
        user: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCHUSERWITHOUTPROFILEID_SUCCESS:
      return{
        ...state,
        userwithoutprofile: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCHUSERS_SUCCESS:
      return{
        ...state,
        users: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCHPROFILES_SUCCESS:
      return {
      ...state,
      profiles: action.payload,
      isFetching: false,
      error: '',
      loggedIn: true
      };
    case FETCHLANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.payload,
        isFetching: false,
        error: ''
      };
    case GETUSERPROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCHUSERLANGUAGES_SUCCESS:
      return{
        ...state,
        userLanguages: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCHFRIENDREQUESTS_SUCCESS:
      return{
        ...state,
        requests: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCHFRIENDS_SUCCESS:
      return{
        ...state,
        friends: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCHUSERPOSTS_SUCCESS:
      return{
        ...state,
        userPosts: action.payload,
        isFetching: false,
        error: ''
      }
    case FETCHPOSTCOMMENTS_SUCCESS:
      return{
        ...state,
        postComments: action.payload,
        isFetching: false,
        error: ''
      }
    default:
      return state
  }
}
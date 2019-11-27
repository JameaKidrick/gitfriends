import { START_FETCHING, FETCH_FAILURE, REGISTER_SUCCESS } from '../actions';


export const initialState = {
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
      return{
        ...state,
        isFetching: false,
        error: ''
      }
    default:
      return state
  }
}
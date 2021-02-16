import { SET_USER_RESPONSE, TOGGLE_IS_RES_FETCHING, SET_USER,  SET_TOKEN,SET_USER_DETAIL,LOGOUT_USER} from '../actionTypes'



const initialState = {
    user: JSON.parse(sessionStorage.getItem("puser")) || null,
    userDetail:null,
    userResponse:null, 
    isResponseFetching:false,
  };
  
  const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_USER:
        const userJSON = JSON.stringify(payload);
        sessionStorage.setItem("puser", userJSON);
        return { ...state, user: payload };
      case SET_USER_DETAIL:
        return {...state,userDetail:payload}
      case SET_TOKEN:
        sessionStorage.setItem("auth_token",payload)
        return state
      case LOGOUT_USER:
        sessionStorage.removeItem("puser");
        sessionStorage.removeItem("auth_token")
        return { ...state, user: null, userDetail:null, userResponse:null };
        case TOGGLE_IS_RES_FETCHING:
        return{...state, isResponseFetching:!state.isResponseFetching}
      case SET_USER_RESPONSE:
        return{...state, userResponse:payload}
      default:
        return state;
    }
  };
  
  export default userReducer;
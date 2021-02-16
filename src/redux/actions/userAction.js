import { SET_USER_RESPONSE, TOGGLE_IS_RES_FETCHING, SET_USER, SET_TOKEN, SET_USER_DETAIL, TOGGLE_ISUSERFETCHING_STATE,LOGOUT_USER } from '../actionTypes'
import axios from 'axios'

export const registerUser = (user, history) => async (dispatch) => {

  try {
    dispatch({ type: TOGGLE_IS_RES_FETCHING })
    dispatch({ type: SET_USER_RESPONSE, payload: null })
    const res = await axios.post(
      `https://dddemo23536e542.herokuapp.com/buyer/register`, user
    );
    if (res.data.success) {
      dispatch({
        type: SET_USER,
        payload: res.data.user
      })
      dispatch({
        type: SET_TOKEN,
        payload: res.data.token
      })
      dispatch({
        type: SET_USER_RESPONSE,
        payload: res.data
      })
      setTimeout(() => {
        history.push('/buyerhome')
      }, 1000)
    }
    else {
      dispatch({
        type: SET_USER_RESPONSE,
        payload: res.data
      })
    }


  } catch (err) {
    console.error(err);
    alert(err.message)
  }
  finally {
    dispatch({ type: TOGGLE_IS_RES_FETCHING })
  }
};

export const loginUser = (user, history) => async (dispatch) => {

  try {
    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
    dispatch({ type: SET_USER_RESPONSE, payload: null })
    dispatch({ type: SET_USER, payload: null })
    console.log(user)
    const { data } = await axios.post(
      `https://dddemo23536e542.herokuapp.com/buyer/login`, user
    );

    if (data.success) {
      dispatch({
        type: SET_USER,
        payload: data.user
      })
      dispatch({
        type: SET_TOKEN,
        payload: data.token
      })
      dispatch({
        type: SET_USER_RESPONSE,
        payload: data
      })
      setTimeout(() => {
        history.push('/buyerhome')
      }, 1000)

    }
    else {

      dispatch({
        type: SET_USER_RESPONSE,
        payload: data
      })
    }


  } catch (err) {
    console.log(err);
    alert(err.message)
  }
  finally {
    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
  }
};

export const getuserDetail = (history) => async (dispatch) => {

  try {

    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
    dispatch({ type: SET_USER_RESPONSE, payload: null })
    dispatch({ type: SET_USER_DETAIL, payload: null })
    const { data } = await axios(
      `https://dddemo23536e542.herokuapp.com/buyer`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
    }
    );


    if (data.success) {
      dispatch({
        type: SET_USER_DETAIL,
        payload: data.userProfile
      })
    }
    else {

      dispatch({
        type: SET_USER_RESPONSE,
        payload: data
      })
      history.push('/login')

    }
  } catch (err) {
    console.log(err);
    alert(err.message)
  }
  finally {
    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
  }
};

export const logoutUser = (data1) => async (dispatch) => {
  const {data} = await axios.post(
      `https://dddemo23536e542.herokuapp.com/buyer/logout`,data1, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
      }
    );
  if(data.success){
    dispatch({
      type:LOGOUT_USER
    })
  }
  

};

export const removeResponse = () => {
  return {
    type: SET_USER_RESPONSE,
    payload: null
  }
}








export const registerseller = (user, history) => async (dispatch) => {

  try {
    dispatch({ type: TOGGLE_IS_RES_FETCHING })
    dispatch({ type: SET_USER_RESPONSE, payload: null })
    const res = await axios.post(
      `http://localhost:5000/seller/register`, user
    );
    if (res.data.success) {
      dispatch({
        type: SET_USER,
        payload: res.data.user
      })
      dispatch({
        type: SET_TOKEN,
        payload: res.data.token
      })
      dispatch({
        type: SET_USER_RESPONSE,
        payload: res.data
      })
      setTimeout(() => {
        history.push('/sellerhome')
      }, 1000)
    }
    else {
      dispatch({
        type: SET_USER_RESPONSE,
        payload: res.data
      })
    }


  } catch (err) {
    console.error(err);
    alert(err.message)
  }
  finally {
    dispatch({ type: TOGGLE_IS_RES_FETCHING })
  }
};

export const loginseller = (user, history) => async (dispatch) => {

  try {
    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
    dispatch({ type: SET_USER_RESPONSE, payload: null })
    dispatch({ type: SET_USER, payload: null })
    console.log(user)
    const { data } = await axios.post(
      `http://localhost:5000/seller/login`, user
    );

    if (data.success) {
      dispatch({
        type: SET_USER,
        payload: data.user
      })
      dispatch({
        type: SET_TOKEN,
        payload: data.token
      })
      dispatch({
        type: SET_USER_RESPONSE,
        payload: data
      })
      setTimeout(() => {
        history.push('/sellerhome')
      }, 1000)

    }
    else {

      dispatch({
        type: SET_USER_RESPONSE,
        payload: data
      })
    }


  } catch (err) {
    console.log(err);
    alert(err.message)
  }
  finally {
    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
  }
};

export const getsellerDetail = (history) => async (dispatch) => {

  try {

    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
    dispatch({ type: SET_USER_RESPONSE, payload: null })
    dispatch({ type: SET_USER_DETAIL, payload: null })
    const { data } = await axios(
      `http://localhost:5000/seller`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
    }
    );


    if (data.success) {
      dispatch({
        type: SET_USER_DETAIL,
        payload: data.userProfile
      })
    }
    else {

      dispatch({
        type: SET_USER_RESPONSE,
        payload: data
      })
      history.push('/login')

    }
  } catch (err) {
    console.log(err);
    alert(err.message)
  }
  finally {
    dispatch({ type: TOGGLE_ISUSERFETCHING_STATE })
  }
};

export const logoutseller = (data1) => async (dispatch) => {
  const {data} = await axios.post(
      `http://localhost:5000/seller/logout`,data1, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
      }
    );
  if(data.success){
    dispatch({
      type:LOGOUT_USER
    })
  }
  

};


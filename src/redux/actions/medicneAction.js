import { GET_CATEGORY, GET_MEDICINE,ADD_MED_RESPONSE,ADD_CAT_RESPONSE,ADD_CART,DELETE_CART,EMPTY_CART } from "../actionTypes";
import axios from "axios";

export const getmedicines = (search = "", categoryname = "") => async (dispatch) => {
    try {
        const res = await axios.get(`https://dddemo23536e542.herokuapp.com/medicine`, {
            params: {
             search,categoryname
            }
          }, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        })
        console.log(res)
        dispatch({ type: GET_MEDICINE, payload: res.data.data})
    }
    catch (err) {
        alert(err.message)
    }
}

export const addmedicines = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`https://dddemo23536e542.herokuapp.com/medicine`,data, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        })
        console.log(res)
        dispatch({ type: ADD_MED_RESPONSE, payload: res.data.message})
    }
    catch (err) {
        alert(err.message)
    }
}

export const addcategory = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`https://dddemo23536e542.herokuapp.com/category`,data, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        })
        console.log(res)
        dispatch({ type: ADD_CAT_RESPONSE, payload: res.data.message})
    }
    catch (err) {
        alert(err.message)
    }
}

export const getcategories = () => async (dispatch) => {
    try {
        const res = await axios(`https://dddemo23536e542.herokuapp.com/category`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        })
        dispatch({ type: GET_CATEGORY, payload: res.data.data })
    }
    catch (err) {
        alert(err.message)
    }
}

export const addcart=(data)=>(dispatch)=>{
dispatch({type:ADD_CART,payload:data})
}

export const deletecart=(id)=>(dispatch)=>{
    dispatch({type:DELETE_CART,payload:id})
}

export const emptycart=()=>(dispatch)=>{
    dispatch({type:EMPTY_CART})
}
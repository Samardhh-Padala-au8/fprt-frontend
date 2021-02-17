import { GET_CATEGORY, GET_MEDICINE, ADD_MED_RESPONSE, ADD_CAT_RESPONSE, ADD_CART, DELETE_CART, EMPTY_CART,EMPTY_CAT_RESPONSE,EMPTY_MED_RESPONSE } from "../actionTypes";

const initialState = {
    categories: [],
    medicines: [],
    addresponse: "",
    catresponse: "",
    cart: []
};


const medicineReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORY:
            return { ...state, categories: payload }
        case GET_MEDICINE:
            return { ...state, medicines: payload }
        case ADD_MED_RESPONSE:
            return { ...state, addresponse: payload }
        case ADD_CAT_RESPONSE:
            return { ...state, catresponse: payload }
        case EMPTY_MED_RESPONSE:
            return { ...state, addresponse: "" }
        case EMPTY_CAT_RESPONSE:
            return { ...state, catresponse: "" }
        case ADD_CART:

            return { ...state, cart: [...state.cart, payload] }

        case EMPTY_CART:
            return { ...state, cart: [] }

        case DELETE_CART:
            console.log(payload)
            const filteredPeople = state.cart.filter((item) => item.medicinename !== payload);
            return { ...state, cart: filteredPeople }

        default:
            return state;
    }
}

export default medicineReducer

// return { ...state, medicines:[...state.medicines, payload] }
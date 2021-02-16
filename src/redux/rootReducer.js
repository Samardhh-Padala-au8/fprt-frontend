import { combineReducers } from 'redux'
import medicineReducer from './reducers/medicineReducer';
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  userState: userReducer,
  medicineState:medicineReducer
});

export default rootReducer;
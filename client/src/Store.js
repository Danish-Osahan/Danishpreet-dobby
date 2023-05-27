import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducer.js";
import {imageCreateReducer,imageListReducer} from './reducers/imageReducers.js'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  imageList:imageListReducer,
  imageCreate:imageCreateReducer
});
const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: user },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;

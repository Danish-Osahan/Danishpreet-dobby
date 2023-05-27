import {
    User_Login_Success,
    User_Login_Fail,
    User_Login_Request,
    User_Logout,
    User_Register_Success,
    User_Register_Fail,
    User_Register_Request
 
  } from "../constants/userConstants.js";


  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case User_Login_Request:
          return {
              loading: true
          }
      case User_Login_Success:
        return {
          userInfo: action.payload,
          loading: false
        };
      case User_Login_Fail:
        return {
          error: action.payload,
          loading: false
        };
  
      case User_Logout:
        return {};
  
      default:
        return state;
    }
  };
  
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case User_Register_Request:
        return{
            loading: true,
        }
      case User_Register_Success:
        return {
          userInfo: action.payload,
          loading:false
        };
      case User_Register_Fail:
        return {
          error: action.payload,
          loading: false
        };
  
      default:
        return state;
    }
  };
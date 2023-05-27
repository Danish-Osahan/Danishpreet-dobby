import {
  User_Login_Success,
  User_Login_Fail,
  User_Login_Request,
  User_Logout,
  User_Register_Success,
  User_Register_Fail,
  User_Register_Request,
} from "../constants/userConstants.js";
import axios from "axios";
const baseUrl = "http://localhost:8080";

export const login = ({email, password}) => async (dispatch) => {
  try {
    dispatch({ type: User_Login_Request });
    const config = {
      headers: { "Content-type": "application/json" },
    };
    const { data } = await axios.post(
      `${baseUrl}/api/users/signin`,

      { email, password },
      config
    );
    dispatch({ type: User_Login_Success, payload: data });
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: User_Login_Fail,
      payload: error.response.data.message,
    });
  }
};

export const Logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: User_Logout });
};

export const register =
  ({firstname, lastname, email, password, confirmpassword}) =>
  async (dispatch) => {
    try {
        dispatch({ type: User_Register_Request });
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        // "http://localhost:5000/api/users",
        `${baseUrl}/api/users/signup`,
        { firstname, lastname, email, password, confirmpassword },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: User_Register_Success, payload: data });
      dispatch({ type: User_Login_Success, payload: data });

      console.log(data);
    } catch (error) {
      dispatch({
        type: User_Register_Fail,
        payload: error.response.data.message,
      });
    }
  };

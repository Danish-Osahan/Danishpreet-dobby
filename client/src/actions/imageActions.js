import {
  Image_Creation_Fail,
  Image_Creation_Request,
  Image_Creation_Success,
  Image_List_Fail,
  Image_List_Success,
  Image_List_Request,
} from "../constants/imageConstants.js";
import axios from "axios";
const baseUrl = "http://localhost:8080";

export const listImages = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: Image_List_Request,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseUrl}/api/images/listImages`, config);
    console.log(data);

    dispatch({
      type: Image_List_Success,
      payload: data,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: Image_List_Fail,
      payload: error?.response?.data?.message,
    });
  }
};

export const createImage =
  ( title, picture ) =>
  async (dispatch, getState) => {
   try {
    dispatch({type:Image_Creation_Request})

    const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/images/createImages`,
        { title, picture },
        config
      );
      console.log(data)

      dispatch({
        type:Image_Creation_Success,
        payload:data
      })
   } catch (error) {
    console.log(error)
      dispatch({
        type:Image_Creation_Fail,
        payload:error?.response?.data?.message,
      })
   }
  };

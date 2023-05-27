import {
  Image_Creation_Fail,
  Image_Creation_Request,
  Image_Creation_Success,
  Image_List_Fail,
  Image_List_Success,
  Image_List_Request,
} from "../constants/imageConstants.js";

export const imageListReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case Image_List_Request:
      return { loading: true };

    case Image_List_Success:
      return {
        images: action.payload,
        loading: false,
      };
    case Image_List_Fail:
      return {
        error: action.payload,
        loading: false,
      };

      default:
        return state;
  }
};

export const imageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case Image_Creation_Request:
      return { loading: true };

    case Image_Creation_Success:
      return {
        loading: false,
        succes: true,
      };

    case Image_Creation_Fail:
      return {
        laoding: false,
        error: action.payload,
      };

      default:
        return state;
  }
};

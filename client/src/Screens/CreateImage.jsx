import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createImage } from "../actions/imageActions.js";
import FileBase64 from "react-file-base64";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateImage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Modal code
  const [open, setOpen] = useState(true);
  const onCloseModal = () => {
    setOpen(false)
    navigate('/main')
};


  const { userInfo } = useSelector((state) => state.userLogin);
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (picture === "") {
      toast.error("Please select a picture");
      return false;
    }
    dispatch(createImage(title, picture));
    toast.success("Image successfully uploaded");
    navigate('/main')

    // dispatch(listImages());
  };
  return (<>
    <ToastContainer/>
       <div className="w-full h-[100vh] flex justify-center items-center ">
       <form onSubmit={handleSubmit} className="w-300 rounded-2xl shadow-2xl px-3 py-3 ">
          <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2 mt-4">
            <label
              htmlFor="title"
              className="text-xl  text-center font-bold bg-gra-100 p-3 rounded-lg shadow-lg text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required={true}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="shadow-lg border rounded-md px-2 py-1 outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#289ee5] outline-[2px] focus:bg-[#fff] "
            />
          </div>
          <div className="w-full bg-[#289ee5] mt-1">
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPicture(base64)}
            />
          </div>

          <div className="w-full mt-3">
            <button type="submit" className="w-full button font-satoshi font-bold text-[22px]">
              Upload
            </button>
          </div>
        </form>
     
       </div>
        
  </>);
};

export default CreateImage;

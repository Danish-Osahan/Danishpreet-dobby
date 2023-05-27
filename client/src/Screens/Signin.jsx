import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, loader } from "../assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction.js";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { userInfo, error, loading } = useSelector((state) => state.userLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ ...formdata }));
    // dispatch(login(formdata.email, formdata.password));
  };
  if (error) {
    toast.error(error);
  }
  useEffect(() => {
    if (userInfo) {
      navigate("/main");
    }
  }, [navigate, userInfo]);
  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="w-full flex justify-center items-center h-[100vh] ">
          <div className="w-100 h-100 flex justify-center items-center shadow-2xl rounded-2xl">
            <img src={loader} alt="Loader" className="w-24 object-contain" />
          </div>
        </div>
      ) : (
        <div
          className=" mt-24 flex flex-col justify-center items-center p-4 rounded-lg shadow-xl h-full"
          data-aos="flip-left"
          data-aos-duration="1000"
        >
          <img
            src={signin}
            alt="signup"
            className="w-[200px] h-[150px] object-cover"
            data-aos="fade-up"
            data-aos-duration="1000"
          />
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2">
              <label
                htmlFor="email"
                className="text-xl  text-center font-bold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                Email
              </label>
              <input
                data-aos="fade-left"
                data-aos-duration="1500"
                type="email"
                name="email"
                placeholder="Email"
                required={true}
                onChange={(e) => {
                  setFormData({ ...formdata, email: e.target.value });
                }}
                className="shadow-lg border rounded-md px-2 py-1 outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#289ee5] outline-[2px] focus:bg-[#fff] "
              />
            </div>
            <div className="flex justify-between items-center font-satoshi w-full  space-x-4 px-2 py-2">
              <label
                data-aos="fade-right"
                data-aos-duration="1500"
                htmlFor="password"
                className="text-xl  text-center font-semibold bg-gra-100 p-3 rounded-lg shadow-md text-gray-700"
              >
                Password
              </label>
              <input
                data-aos="fade-left"
                data-aos-duration="1500"
                type="password"
                name="password"
                placeholder="Password"
                required={true}
                onChange={(e) => {
                  setFormData({ ...formdata, password: e.target.value });
                }}
                className="shadow-lg border rounded-md px-2 py-1 outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#289ee5] outline-[2px] focus:bg-[#fff] "
              />
            </div>
            <div className="w-full px-2 mt-2 ">
              <button
                type="submit"
                className="button mt-2 mb-4 shadow-md w-full font-satoshi font-bold text-[22px]"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                Signin
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="font-satoshi text-md font-semibold text-gray-800"
              >
                Don't have an account? Signup
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Signin;

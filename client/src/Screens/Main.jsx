import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, mainlogo, create, loader } from "../assets";
import { Logout } from "../actions/userAction";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import FileBase64 from "react-file-base64";
import "react-toastify/dist/ReactToastify.css";
import { createImage, listImages } from "../actions/imageActions.js";
import ImageCard from "../components/ImageCard";

const Main = () => {
  // Modal code
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (picture === "") {
      toast.error("Please select a picture");
      return false;
    }
    dispatch(createImage(title, picture));
    toast.success("Image successfully uploaded");

    onCloseModal();
    
  };
  

  ////////////////////////////////////////////////////////////
  const { userInfo } = useSelector((state) => state.userLogin);
  const { images, error, loading } = useSelector((state) => state.imageList);
  const { success } = useSelector((state) => state.imageCreate);
  // console.log(images);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listImages());
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo, navigate, dispatch,success]);

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/signin");
  };

  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [search, setSearch] = useState("");

  if (error) {
    toast.error(error);
  }

  const handleClick = () => {
      navigate("/createImage");
    };
 
  ////////////////////////////////////////////////////////////////
  return (
    <>
      <ToastContainer />
      <header className="w-full  flex justify-center items-center flex-col mb-2 mt-4">
        <nav className="w-full items-center justify-between flex ">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="justify-center items-center flex "
          >
            <img src={mainlogo} alt="" className="w-16 object-contain" />
            <h3 className="font-satoshi sm:text-2xl xs:text-2xl md:text-3xl mt-1.5 lg:text-3xl font-extrabold blue_gradient ">
              PicPulse
            </h3>
          </div>

          <button
            onClick={handleLogout}
            data-aos-duration="1000"
            data-aos="fade-left"
            className=" rounded-full shadow-xl translate-all bg-[#289ee5]  border-none  font-satoshi font-semibold text-xl  hover:bg-[#a3daf2] text-white hover:text-black p-1"
          >
            <img src={logout} alt="Github" className="w-12 object-contain" />
            {/* Logout */}
          </button>
        </nav>
        <h2
          className="max-w-2x mt-2 text-center font-satoshi text-3xl
         font-extrabold "
        >
          <span className=" blue_gradient"> Securely Capture </span>and Curate
          Your Personal Moments
        </h2>
      </header>
      <div className="w-full flex justify-between mt-2  space-x-4">
        <input
          data-aos="fade-left"
          data-aos-duration="1000"
          type="text"
          name="search"
          placeholder="Search..."
          // required={true}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="shadow-lg border rounded-full px-2  outline-none block w-full bg-gray-50 focus:outline-offset-[5px] outline-[#289ee5] outline-[2px] focus:bg-[#fff] "
        />
        <button
          data-aos="fade-right"
          data-aos-duration="1000"
          className=" rounded-full shadow-xl translate-all bg-[#289ee5]  border-none  font-satoshi font-semibold text-xl  hover:bg-[#a3daf2] text-white hover:text-black p-2 "
          onClick={onOpenModal}
        >
          <img src={create} alt="Github" className="w-10 object-contain" />
        </button>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="w-full button font-satoshi font-bold text-[22px]"
            >
              Upload
            </button>
          </div>
        </form>
      </Modal>
      <section
        className="flex 
      justify-center  items-center flex-wrap gap-4 mt-6 flex-row mb-6"
      >
        {loading? (
          <div className="w-full flex justify-center items-center ">
            <img src={loader} alt="Loader" className="w-20 object-contain" />
          </div>
        ) : (
          images
            ?.filter((filteredImage) =>
              filteredImage?.title.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((image) => (
              <ImageCard
                key={image._id}
                Title={image.title}
                picture={image.picture}
              />
            ))
        )}
      </section>
    </>
  );
};

export default Main;

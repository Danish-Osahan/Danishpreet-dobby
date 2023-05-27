import React from "react";
import {welcome } from "../assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
AOS.init();
const Home = () => {

    const navigate =useNavigate();
    const handleClick=() => {
        navigate('/signin')
    }
  return (
    <div className="flex justify-center  flex-col items-center ">
      <img
        data-aos="fade-up"
        data-aos-duration="1000"
        src={welcome}
        alt="welcome"
        className="w-[650px] h-[400px] object-contain"
      />
      <h1
        className=" text-2xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center"
        data-aos="flip-left"
        data-aos-duration="1000"
      >
       Unleash Your Visual Storytelling: Upload, Share, and Preserve Your Memories with Ease!
      </h1>
      <button
        onClick={handleClick}
        className="button mt-2 mb-4 shadow-md"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        Let's Get Started
      </button>
    </div>
  );
};

export default Home;

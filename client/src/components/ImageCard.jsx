import React from "react";
import { title } from "../assets";

const ImageCard = ({ Title, picture }) => {
  return (
    <div data-aos="fade-up"  data-aos-duration="1000" className="w-[350px] flex-col shadow-2xl rounded-xl p-2">
      <div className="w-full  ">
        <img
          //   src="https://cdn.pixabay.com/photo/2023/05/20/00/18/boat-8005603_1280.jpg"
          src={picture}
          alt="Notfound"
          className="object-contain w-full rounded-md"
        />
      </div>
      <div className="space-x-1 flex flex-row mt-1 text-2xl font-semibold items-center">
        <img src={title} alt="Title" className="object-contain w-8" />
        <h3 className="mb-1">{Title}</h3>
      </div>
    </div>
  );
};

export default ImageCard;

import React from "react";
import { AiOutlineCamera } from "react-icons/ai";

function ImageGrid(props) {
  // console.log(props);
  return (
    <>
      <div className="w-full h-60 md:hidden">
        <img
          src={props.images.length && props.images[0].location}
          alt="restaurant"
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>
      <div className="hidden w-full h-96 md:flex gap-1">
        <div className="w-full h-full overflow-hidden rounded-lg ">
          <img
            src={props.images.length && props.images[0].location}
            alt="restaurant"
            className="w-full h-full object-cover object-center transform transition duration-700 hover:scale-110 cursor-pointer"
          />
        </div>
        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <img
              src={props.images.length && props.images[1].location}
              alt="restaurant"
              className="w-full h-full object-cover object-center rounded-lg transform transition duration-700 hover:scale-110 cursor-pointer"
            />
          </div>
          <div className="w-full h-2/4 overflow-hidden rounded-lg">
            <img
              src={props.images.length && props.images[2].location}
              alt="restaurant"
              className="h-full object-cover object-center rounded-lg transform transition duration-700 hover:scale-110 cursor-pointer"
            />
          </div>
        </div>
        <div className="w-1/4 h-full flex flex-col gap-1 overflow-hidden">
          <div className="w-full h-2/4 relative">
            <img
              src={props.images.length && props.images[3].location}
              alt="restaurant"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-opacity-40 bg-black w-full h-full rounded-lg cursor-pointer" />
            <h4 className="absolute inset-y-2/4 w-full h-full text-center text-white font-semibold cursor-pointer">
              View Gallery
            </h4>
          </div>
          <div className="w-full h-2/4 relative ">
            <img
              src={props.images.length && props.images[4].location}
              alt="restaurant"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-opacity-40 bg-black w-full h-full rounded-lg cursor-pointer" />
            <div className="absolute flex flex-col items-center inset-y-1/4 w-full h-full text-center text-white font-semibold cursor-pointer">
              <div className="bg-black p-3 rounded-full bg-opacity-50 ">
                <AiOutlineCamera className="text-white" />
              </div>
              <h4>Add Photos</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageGrid;

import React,{ useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useSelector } from "react-redux";



function CheckoutNavbar() {
  const [user] = useState({
    fullName:"",
    email:""
  });
  const reduxState = useSelector((globalState) => globalState.user.user.user);
  
  return (
    <>
      <nav className="p-4 flex bg-white shadow-md  w-full items-center">
        <div className="container px-4 md:px-20 mx-auto">
          <div className="flex items-center justify-between w-full">
            <AiOutlineArrowLeft />
            <div className="w-28">
              <img
                src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                alt="logo"
                className="w-full h-full"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-gray-300 text-zomato-400 w-12 h-12 rounded-full">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRxr7WumzwmI6uKuo7EgAgjv2YVhinzl0PLA&usqp=CAU"
                  alt={reduxState?.email}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {reduxState?.fullName}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default CheckoutNavbar;

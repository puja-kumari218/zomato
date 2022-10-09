import React from "react";
import FoodTab from "../components/FoodTab";
import Navbar from "../components/NavBar";

function Homelayout({ props, children }) {
  return (
    <div>
      <Navbar />
      <FoodTab />
      <div className="container mx-auto px-4 lg:px-20">
        {children}
      </div>
    </div>
  );
}

export default Homelayout;

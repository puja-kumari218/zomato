import React, { useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";
import { getCart } from "../redux/reducers/cart/cart.action"; 

// components
import Navbar from "../components/NavBar/CheckoutNavbar";

function CheckoutLayout(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [])
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 lg:px-20">{props.children}</div>
    </>
  );
}

export default CheckoutLayout;

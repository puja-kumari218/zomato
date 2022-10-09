import "./App.css";
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import { Routes } from "react-router-dom";

// hoc
import HomeLayouthoc from "./HOC/Home.hoc";
import RestaurantLayoutHoc from "./HOC/Restaurant.hoc";
import CheckoutLayoutHoc from "./HOC/Checkout.hoc";

// Pages
import HomePage from "./pages/HomePage";
// import RestaurantPage from "./pages/RestaurantPage";
import CheckoutPage from "./pages/CheckoutPage";
import GoogleAuth from "./pages/GoogleAuth";

// Components
import Overview from "./components/Restaurant/Overview";
import OrderOnline from "./components/Restaurant/OrderOnline";
import Reviews from "./components/Restaurant/Reviews/Reviews";
import Menu from "./components/Restaurant/Menu/Menu";
import Photos from "./components/Restaurant/Photos/Photos";
import Redirect from "./pages/Restaurant/Redirect";

// redux
import { useDispatch } from "react-redux";
import { getMySelf } from "./redux/reducers/user/user.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySelf());
  }, [localStorage]);

  return (
    <>
      <HomeLayouthoc component={HomePage} path="/" />
      <HomeLayouthoc component={HomePage} path="/:type" />
      <HomeLayouthoc component={GoogleAuth} path="/google/:token" />
      <RestaurantLayoutHoc component={Redirect} path="/restaurant/:id" />
      <RestaurantLayoutHoc
        component={Overview}
        path="/restaurant/:id/overview"
      />
      <RestaurantLayoutHoc
        component={OrderOnline}
        path="/restaurant/:id/order-online"
      />
      <RestaurantLayoutHoc component={Reviews} path="/restaurant/:id/reviews" />
      <RestaurantLayoutHoc component={Menu} path="/restaurant/:id/menu" />
      <RestaurantLayoutHoc component={Photos} path="/restaurant/:id/photos" />
      <CheckoutLayoutHoc component={CheckoutPage} path="/checkout/orders" />
    </>
  );
}

export default App;

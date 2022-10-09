import React from "react";
import { BsShieldLockFill } from "react-icons/bs";

// redux
import { useSelector } from "react-redux";

// Payment Gateway
import Razorpay from "razorpay";

// components
import FoodItem from "../components/Cart/FoodItem";
import AddressList from "../components/Checkout/AddressList";

function CheckoutPage() {
  const address = [
    {
      name: "Home",
      address: "St-470 Delhi",
    },
    {
      name: "Work",
      address: "123 Main St",
    },
    {
      name: "Other",
      address: "123 Main St",
    },
  ];

  const reduxStateCart = useSelector((globalState) => globalState.cart.cart);
  const reduxStateUser = useSelector((globalState)=> globalState.user.user.user);

  const payNow = () => {
    let options = {
      key: "rzp_test_VkA7y7Lz3U0Xa6",
      amount:
        reduxStateCart.reduce(
          (total, current) => total + current.totalPrice,
          0
        ) * 100,
      currency: "INR",
      name: "Zomato Master",
      description: "Fast Delivery Service",
      image:
        "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png",
      handler: (data) => {
        alert("Payment Successful");
        console.log(data);
      },
      prefill: {
        name: reduxStateUser.fullName,
        email: reduxStateUser.email,
      },
      theme: {
        color: "#e23744",
      },
    };

    let razorPay = new window.Razorpay(options);
    razorPay.open();
  };

  return (
    <div className="my-3 flex flex-col gap-3 items-center">
      <h1 className="text-xl text-center md:text-2xl font-bold">Checkout</h1>
      <div className="w-full md:w-3/5 rounded-lg py-3 shadow-lg bg-white flex flex-col items-center">
        <h3 className="text-lg font-semibold">Summary</h3>
        <div className="flex w-full flex-col gap-2 items-center">
          <h5 className="text-base tracking-wider">ORDER FROM</h5>
          <div className="flex w-full flex-col items-center text-gray-400">
            <h4>BakeHouse Comfort</h4>
            <small>
              Shop 52, Plot 8, 9&10, G-8, Ground Floor, DDA Market, J-Block,
              Community Centre, Rajouri Garden, New Delhi
            </small>
          </div>
          <div className="my-4 h-32 overflow-y-scroll px-4 flex flex-col gap-2 w-full md:w-3/5">
            {reduxStateCart?.map((food) => (
              <FoodItem key={food._id} {...food} />
            ))}
          </div>
          <div className="flex flex-col gap-3 w-full md:w-3/5 items-center">
            <h4 className="text-xl font-semibold">Choose Address</h4>
            <AddressList address={address} key={address.name} />
          </div>
        </div>
        <button
          onClick={payNow}
          className="flex items-center gap-2 justify-center my-4 md:my-8 w-full px-4 md:w-4/5 h-14 text-white font-medium text-lg bg-zomato-400 rounded-lg"
        >
          Pay Securely <BsShieldLockFill />
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;

// Dummy Data

// const foods = [
//   {
//     name: "Chicken Dum Hyderabadi Biryani",
//     image:
//       "https://b.zmtcdn.com/data/dish_photos/c43/e693f5e9566efb71e7a5e46d23d1ac43.jpg",
//     isAddedToCart: false,
//     rating: 3,
//     price: 640,
//     quantity:1,
//     description:
//       "Bikkgane signature Chicken Biryani with tastefully marinated and succulent pieces of chicken cooked in a rich mix of long grain rice , delicately flavoured with authentic herbs, spices and saffron. Will be served with either raita or salan.",
//   },
//   {
//     name: "Veg Dum Hyderabadi Biryani",
//     image:
//       "https://b.zmtcdn.com/data/dish_photos/07a/1d6f632cc06fc81eb12447d1524a807a.jpg",
//     isAddedToCart: false,
//     rating: 4,
//     price: 445,
//     quantity:1,
//     description:
//       "A handpicked selection of garden fresh vegetables, layered with aromatic saffron rice; delicately flavoured with herbs and blended spices.Will be served with either raita or salan.",
//   },
//   {
//     name: "Paneer Hyderabadi Biryani",
//     image:
//       "https://b.zmtcdn.com/data/dish_photos/b9c/9bae52c44841270ec93f11a3251d6b9c.jpg",
//     isAddedToCart: true,
//     ratings: 5,
//     price: 280,
//     quantity:2,
//     description:
//       "Fragrant long grain Basmati rice steamed with delicately spiced cottage cheese and garnished with an assortment of herbs and spices.",
//   },
// ];

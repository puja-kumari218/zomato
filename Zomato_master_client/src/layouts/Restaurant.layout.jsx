import React, { useState, useEffect } from "react";
import { TiStarOutline } from "react-icons/ti";
import { RiDirectionLine, RiShareForwardLine } from "react-icons/ri";
import { BiBookmarkPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";

// Components
import Navbar from "../components/NavBar";
import ImageGrid from "../components/Restaurant/ImageGrid";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import InfoButton from "../components/Restaurant/InfoButton";
import Tabs from "../components/Restaurant/Tabs";
import CartContainer from "../components/Cart/CartContainer";

// Redux
import { useDispatch } from "react-redux";
import { getSpecificRestaurant } from "../redux/reducers/restaurant/restaurant.action";
import { getImage } from "../redux/reducers/image/image.action";
import { getCart } from "../redux/reducers/cart/cart.action";

function RestaurantLayout({ children }) {
  const [restaurant, setRestaurant] = useState({
    images: [],
    name: "",
    cuisine: [],
    address: "",
    restaurantRating: 2.9,
    deliveryRating: 3.0,
  });

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificRestaurant(id)).then((data) => {
      setRestaurant((prev) => ({
        ...prev,
        ...data.payload.restaurant,
      }));

      dispatch(getImage(data.payload.restaurant.photos)).then((data) => {
        // console.log(data);
        setRestaurant((prev) => ({
          ...prev,
          images: data.payload.images,
        }));
      });
    });
    dispatch(getCart());
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-8 lg:px-20 pb-20">
        <ImageGrid images={restaurant.images} />
        <RestaurantInfo
          name={restaurant?.name}
          restaurantRating={restaurant?.restaurantRating || 0}
          deliveryRating={restaurant?.deliveryRating || 0}
          cuisine={restaurant?.cuisine}
          address={restaurant?.address}
        />
        <div className="my-4 flex flex-wrap gap-3 mx-auto">
          <InfoButton isActive={true}>
            <TiStarOutline /> Add Review
          </InfoButton>
          <InfoButton>
            <RiDirectionLine /> Direction
          </InfoButton>
          <InfoButton>
            <BiBookmarkPlus /> Bookmark
          </InfoButton>
          <InfoButton>
            <RiShareForwardLine /> Share
          </InfoButton>
        </div>
        <div className="my-10">
          <Tabs />
        </div>
        {children}
      </div>
      <CartContainer />
    </>
  );
}

export default RestaurantLayout;

// Note:-Dummy Data
// const [restaurant, setRestaurant] = useState({
//   images: [
//     "https://b.zmtcdn.com/data/pictures/chains/5/312995/734d388d6aaa9937ff2cfca22aea42df.jpg",
//     "https://b.zmtcdn.com/data/pictures/chains/5/312995/b26d398e992ad8d2b64e26355078cd80.jpg",
//     "https://b.zmtcdn.com/data/pictures/chains/5/312995/98f3ba8e0766ff23919849326cf06264.jpg",
//     "https://b.zmtcdn.com/data/pictures/chains/5/312995/fc09e4e8a72ad0ead40079d43065d8af.jpg",
//     "https://b.zmtcdn.com/data/pictures/chains/5/312995/1e5b895672733a7c27064f5f3082ced8.jpg",
//   ],
//   name: "BakeHouse Comfort",
//   cuisine: ["Bakery", "Desserts", "Fast Food"],
//   address: "Sahu Market, Chas, Bokaro",
//   restaurantRating: 4.1,
//   deliveryRating: 3.2,
// });

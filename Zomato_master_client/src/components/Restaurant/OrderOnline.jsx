import React, { useState, useEffect } from "react";
import { AiOutlineCompass } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getFoodList } from "../../redux/reducers/food/food.action";
// import { getCart } from "../../redux/reducers/cart/cart.action";

// Components
import MenuListContainer from "./Order-Online/MenuListContainer";
import FoodList from "./Order-Online/FoodList";
import FloatMenuBtn from "./Order-Online/FloatMenuBtn";

function OrderOnline() {
  const [menu, setMenu] = useState([]);
  const [selected, setSelected] = useState("");

  const onClickHandler = (e) => {
    if (e.target.id) {
      setSelected(e.target.id);
    }
    // console.log(e);
    return;
  };

  const dispatch = useDispatch();

  const reduxState = useSelector(
    (globalState) => globalState.restaurant.selectedRestaurant.restaurant
  );

  useEffect(() => {
    reduxState &&
      dispatch(getFoodList(reduxState.menu)).then((data) => {
        setMenu(data.payload.menus.menus);
      });
    // dispatch(getCart());
  }, [reduxState]);

  return (
    <>
      <div className="w-full h-screen flex">
        <aside className="hidden md:flex flex-col gap-1 border-r overflow-y-scroll border-gray-200 h-screen w-1/4">
          {menu.map((item, index) => (
            <MenuListContainer
              {...item}
              key={index}
              onClickHandler={onClickHandler}
              selected={selected}
            />
          ))}
        </aside>
        <div className="w-full px-3 md:w-3/4">
          <div className="pl-3 mb-4">
            <h2 className="text-xl font-semibold">Order Online</h2>
            <h4 className="flex items-center gap-2 font-light text-gray-500">
              <AiOutlineCompass /> Live Track Your Order | <BiTimeFive /> 45 min
            </h4>
          </div>
          <section className="flex h-screen overflow-y-scroll flex-col gap-3 md:gap-5">
            {menu.map((item, index) => (
              <FoodList key={index} {...item} />
            ))}
          </section>
        </div>
      </div>
      <FloatMenuBtn
        menu={menu}
        onClickHandler={onClickHandler}
        selected={selected}
      />
    </>
  );
}

export default OrderOnline;

// Menu Dummy Data:-
// {
//   name: "Recommended",
//   items: [
//     {
//       name: "Chicken Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/c43/e693f5e9566efb71e7a5e46d23d1ac43.jpg",
//       isAddedToCart: false,
//       rating: 3,
//       price: 445,
//       description:
//         "Bikkgane signature Chicken Biryani with tastefully marinated and succulent pieces of chicken cooked in a rich mix of long grain rice , delicately flavoured with authentic herbs, spices and saffron. Will be served with either raita or salan.",
//     },
//     {
//       name: "Veg Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/07a/1d6f632cc06fc81eb12447d1524a807a.jpg",
//       isAddedToCart: false,
//       rating: 4,
//       price: 445,
//       description:
//         "A handpicked selection of garden fresh vegetables, layered with aromatic saffron rice; delicately flavoured with herbs and blended spices.Will be served with either raita or salan.",
//     },
//     {
//       name: "Paneer Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/b9c/9bae52c44841270ec93f11a3251d6b9c.jpg",
//       isAddedToCart: true,
//       ratings: 5,
//       price: 500,
//       description:
//         "Fragrant long grain Basmati rice steamed with delicately spiced cottage cheese and garnished with an assortment of herbs and spices.",
//     },
//   ],
// },
// {
//   name: "Hyderabadi Biryani",
//   items: [
//     {
//       name: "Chicken Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/c43/e693f5e9566efb71e7a5e46d23d1ac43.jpg",
//       isAddedToCart: false,
//       rating: 3,
//       price: 445,
//       description:
//         "Bikkgane signature Chicken Biryani with tastefully marinated and succulent pieces of chicken cooked in a rich mix of long grain rice , delicately flavoured with authentic herbs, spices and saffron. Will be served with either raita or salan.",
//     },
//     {
//       name: "Veg Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/07a/1d6f632cc06fc81eb12447d1524a807a.jpg",
//       isAddedToCart: false,
//       rating: 4,
//       price: 445,
//       description:
//         "A handpicked selection of garden fresh vegetables, layered with aromatic saffron rice; delicately flavoured with herbs and blended spices.Will be served with either raita or salan.",
//     },
//     {
//       name: "Paneer Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/b9c/9bae52c44841270ec93f11a3251d6b9c.jpg",
//       isAddedToCart: true,
//       ratings: 5,
//       price: 500,
//       description:
//         "Fragrant long grain Basmati rice steamed with delicately spiced cottage cheese and garnished with an assortment of herbs and spices.",
//     },
//   ],
// },
// {
//   name: "Andhra Biryan",
//   items: [
//     {
//       name: "Chicken Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/c43/e693f5e9566efb71e7a5e46d23d1ac43.jpg",
//       isAddedToCart: false,
//       rating: 3,
//       price: 445,
//       description:
//         "Bikkgane signature Chicken Biryani with tastefully marinated and succulent pieces of chicken cooked in a rich mix of long grain rice , delicately flavoured with authentic herbs, spices and saffron. Will be served with either raita or salan.",
//     },
//     {
//       name: "Veg Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/07a/1d6f632cc06fc81eb12447d1524a807a.jpg",
//       isAddedToCart: false,
//       rating: 4,
//       price: 445,
//       description:
//         "A handpicked selection of garden fresh vegetables, layered with aromatic saffron rice; delicately flavoured with herbs and blended spices.Will be served with either raita or salan.",
//     },
//     {
//       name: "Paneer Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/b9c/9bae52c44841270ec93f11a3251d6b9c.jpg",
//       isAddedToCart: true,
//       ratings: 5,
//       price: 500,
//       description:
//         "Fragrant long grain Basmati rice steamed with delicately spiced cottage cheese and garnished with an assortment of herbs and spices.",
//     },
//   ],
// },
// {
//   name: "Momos",
//   items: [
//     {
//       name: "Chicken Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/c43/e693f5e9566efb71e7a5e46d23d1ac43.jpg",
//       isAddedToCart: false,
//       rating: 3,
//       price: 445,
//       description:
//         "Bikkgane signature Chicken Biryani with tastefully marinated and succulent pieces of chicken cooked in a rich mix of long grain rice , delicately flavoured with authentic herbs, spices and saffron. Will be served with either raita or salan.",
//     },
//     {
//       name: "Veg Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/07a/1d6f632cc06fc81eb12447d1524a807a.jpg",
//       isAddedToCart: false,
//       rating: 4,
//       price: 445,
//       description:
//         "A handpicked selection of garden fresh vegetables, layered with aromatic saffron rice; delicately flavoured with herbs and blended spices.Will be served with either raita or salan.",
//     },
//     {
//       name: "Paneer Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/b9c/9bae52c44841270ec93f11a3251d6b9c.jpg",
//       isAddedToCart: true,
//       ratings: 5,
//       price: 500,
//       description:
//         "Fragrant long grain Basmati rice steamed with delicately spiced cottage cheese and garnished with an assortment of herbs and spices.",
//     },
//   ],
// },
// {
//   name: "Breads",
//   items: [
//     {
//       name: "Chicken Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/c43/e693f5e9566efb71e7a5e46d23d1ac43.jpg",
//       isAddedToCart: false,
//       rating: 3,
//       price: 445,
//       description:
//         "Bikkgane signature Chicken Biryani with tastefully marinated and succulent pieces of chicken cooked in a rich mix of long grain rice , delicately flavoured with authentic herbs, spices and saffron. Will be served with either raita or salan.",
//     },
//     {
//       name: "Veg Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/07a/1d6f632cc06fc81eb12447d1524a807a.jpg",
//       isAddedToCart: false,
//       rating: 4,
//       price: 445,
//       description:
//         "A handpicked selection of garden fresh vegetables, layered with aromatic saffron rice; delicately flavoured with herbs and blended spices.Will be served with either raita or salan.",
//     },
//     {
//       name: "Paneer Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/b9c/9bae52c44841270ec93f11a3251d6b9c.jpg",
//       isAddedToCart: true,
//       ratings: 5,
//       price: 500,
//       description:
//         "Fragrant long grain Basmati rice steamed with delicately spiced cottage cheese and garnished with an assortment of herbs and spices.",
//     },
//   ],
// },
// {
//   name: "Desserts",
//   items: [
//     {
//       name: "Chicken Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/c43/e693f5e9566efb71e7a5e46d23d1ac43.jpg",
//       isAddedToCart: false,
//       rating: 3,
//       price: 445,
//       description:
//         "Bikkgane signature Chicken Biryani with tastefully marinated and succulent pieces of chicken cooked in a rich mix of long grain rice , delicately flavoured with authentic herbs, spices and saffron. Will be served with either raita or salan.",
//     },
//     {
//       name: "Veg Dum Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/07a/1d6f632cc06fc81eb12447d1524a807a.jpg",
//       isAddedToCart: false,
//       rating: 4,
//       price: 445,
//       description:
//         "A handpicked selection of garden fresh vegetables, layered with aromatic saffron rice; delicately flavoured with herbs and blended spices.Will be served with either raita or salan.",
//     },
//     {
//       name: "Paneer Hyderabadi Biryani",
//       image:
//         "https://b.zmtcdn.com/data/dish_photos/b9c/9bae52c44841270ec93f11a3251d6b9c.jpg",
//       isAddedToCart: true,
//       ratings: 5,
//       price: 500,
//       description:
//         "Fragrant long grain Basmati rice steamed with delicately spiced cottage cheese and garnished with an assortment of herbs and spices.",
//     },
//   ],
// }

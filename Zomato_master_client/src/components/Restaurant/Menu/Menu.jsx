import React, { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getImage } from "../../../redux/reducers/image/image.action";

// Components
import MenuCollection from "../MenuCollection";

function Menu() {
  const dispatch = useDispatch();
  const [menus, setMenus] = useState([]);
  const reduxState = useSelector(
    (globalState) => globalState.restaurant.selectedRestaurant.restaurant
  );

  useEffect(() => {
    if (reduxState)
      dispatch(getImage(reduxState?.menuImages)).then((data) => {
        const images = [];
        data.payload.images.map(({ location }) => images.push(location));
        console.log(images);
        setMenus(images);
      });
  }, [reduxState]);

  return (
    <>
      <div className="flex flex-wrap gap-3 my-4">
        <MenuCollection
          menuTitle="Menu"
          pages={menus.length}
          image={menus}
        />
      </div>
    </>
  );
}

export default Menu;

// Dummy Data:
// images: [
//   "https://b.zmtcdn.com/data/menus/558/18219558/36939dd9114b9b0f9694fd22522540b8.jpg",
//   "https://b.zmtcdn.com/data/menus/558/18219558/6cd3aca5c09cde1c6870d09b43d8f7c6.jpg",
//   "https://b.zmtcdn.com/data/menus/558/18219558/2b2bf0ecc7c225a9b56492775933b88e.jpg",
//   "https://b.zmtcdn.com/data/menus/558/18219558/aa05cd2583d68ccbd08cca12e1861c2c.jpg",
//   "https://b.zmtcdn.com/data/menus/558/18219558/02b150f6e52fc5a9bfe2eaa965a8fbeb.jpg",
// ],

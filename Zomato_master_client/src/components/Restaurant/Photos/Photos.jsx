import React, { useState, useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";


// redux
import { useSelector, useDispatch } from "react-redux";
import { getImage } from "../../../redux/reducers/image/image.action";

// Components
import PhotoCollection from "./PhotoCollection";

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const closeViewer = () => setIsMenuOpen(false);
  const openViewer = () => setIsMenuOpen(true);

  const reduxState = useSelector(
    (globalState) => globalState.restaurant.selectedRestaurant.restaurant
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxState)
      dispatch(getImage(reduxState?.menuImages)).then((data) => {
        const images = [];
        data.payload.images.map(({ location }) => images.push(location));
        console.log(images);
        setPhotos(images);
      });
  }, [reduxState]);

  return (
    <>
      {isMenuOpen && (
        <ImageViewer
          src={photos}
          currentIndex={currentImage}
          disableScroll={false}
          onClose={closeViewer}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {photos.map((photo, index) => (
          <PhotoCollection
            key={index}
            openViewer={openViewer}
            index={index}
            image={photo}
            setCurrentImage={setCurrentImage}
          />
        ))}
      </div>
    </>
  );
}

export default Photos;



// Dummy Data
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/734d388d6aaa9937ff2cfca22aea42df.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/b26d398e992ad8d2b64e26355078cd80.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/98f3ba8e0766ff23919849326cf06264.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/3/307893/37d17b8414ea17a06cc8c460e5408cb2.jpg",
// "https://b.zmtcdn.com/data/reviews_photos/80c/9bb4f5c1bc140299ac88a71b1b04280c_1493725089.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/734d388d6aaa9937ff2cfca22aea42df.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/b26d398e992ad8d2b64e26355078cd80.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/98f3ba8e0766ff23919849326cf06264.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/3/307893/37d17b8414ea17a06cc8c460e5408cb2.jpg",
// "https://b.zmtcdn.com/data/reviews_photos/80c/9bb4f5c1bc140299ac88a71b1b04280c_1493725089.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/734d388d6aaa9937ff2cfca22aea42df.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/b26d398e992ad8d2b64e26355078cd80.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/98f3ba8e0766ff23919849326cf06264.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/3/307893/37d17b8414ea17a06cc8c460e5408cb2.jpg",
// "https://b.zmtcdn.com/data/reviews_photos/80c/9bb4f5c1bc140299ac88a71b1b04280c_1493725089.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/734d388d6aaa9937ff2cfca22aea42df.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/b26d398e992ad8d2b64e26355078cd80.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/5/312995/98f3ba8e0766ff23919849326cf06264.jpg",
// "https://b.zmtcdn.com/data/pictures/chains/3/307893/37d17b8414ea17a06cc8c460e5408cb2.jpg",
// "https://b.zmtcdn.com/data/reviews_photos/80c/9bb4f5c1bc140299ac88a71b1b04280c_1493725089.jpg",

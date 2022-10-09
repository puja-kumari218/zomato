import React, {useState, useEffect} from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../redux/reducers/review/review.action";


// Components
import ReviewCard from "./ReviewCard";
import AddReviewCard from "./AddReviewCard";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  
  const reduxState = useSelector(
    (globalState) => globalState.restaurant.selectedRestaurant.restaurant
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxState) {
      dispatch(getReviews(reduxState?._id)).then((data) =>
        setReviews(data.payload.reviews)
      );
    }
  }, [reduxState]);

  
  return (
    <>
      <div className="w-full h-full flex-col md:flex md:flex-row relative gap-5">
        <div className="w-full md:w-8/12 flex flex-col gap-3">
          <div className="md:hidden mb-4">
            <AddReviewCard />
          </div>
          {reviews.map((review, index) => (
            <ReviewCard {...review} key={index} />
          ))}
        </div>
        <aside
          style={{ height: "fit-content" }}
          className="hidden md:flex items-start md:w-4/12 sticky rounded-xl top-2 bg-white p-4 shadow-md flex-col gap-3"
        >
          <AddReviewCard />
        </aside>
      </div>
    </>
  );
}

export default Reviews;

// dummy Data
// const [reviews, setReviews] = useState([
  //   {
  //     fullName: "Vaibhav",
  //     isRestaurantReview: false,
  //     createAt: "2021-10-05",
  //     reviewText: "Lovely in Taste.",
  //     rating: 4,
  //   },
  //   {
  //     fullName: "Aarav",
  //     isRestaurantReview: false,
  //     createAt: "2009-04-12",
  //     reviewText: "Lovely in Taste.",
  //     rating: 3,
  //   },
  //   {
  //     fullName: "Jay",
  //     isRestaurantReview: false,
  //     createAt: "2001-04-04",
  //     reviewText: "Lovely in Taste.",
  //     rating: 2,
  //   },
  //   {
  //     fullName: "Astha",
  //     isRestaurantReview: false,
  //     createAt: "2021-10-11",
  //     reviewText: "Lovely in Taste.",
  //     rating: 5,
  //   },
  // ]);
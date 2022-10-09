// libraries
import express from "express";
import passport from "passport";

// database model
import { ReviewModel } from "../../database/allModels";

// intialize Route
const Router = express.Router();

/**
 * Route        /
 * Des          get all reviews of particular restaurant
 * Params       rest_id
 * Access       Public
 * Method       Get
 */
// http://localhost:4000/reviews/:rest_id
Router.get("/:rest_id", async (req, res) => {
  try {
    const { rest_id } = req.params;
    const reviews = await ReviewModel.find({ restaurant: rest_id });

    return res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: err.message });
  }
});

/**
 * Route        /new
 * Des          postinng new food/Restaurant Reviews and ratings
 * Params
 * Access       Private
 * Method       POst
 */
// http://localhost:4000/review/new
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { _id } = req.session.passport.user._doc;
    const reviewData = req.body.reviewData;
    console.log(reviewData);

    await ReviewModel.create({ ...reviewData, user: _id });
    return res.status(200).json({ Review: "Review is Successfully Updated." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: err.message });
  }
});

/**
 * Route        /delete
 * Des          delete a specific review
 * Params       _id
 * Access       Public
 * Method       delete
 */
// http://localhost:4000/reviews/:rest_id
Router.get("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ReviewModel.findByIdAndDelete(_id);

    return res.status(200).json({ review: "Review Delated !!!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: err.message });
  }
});

export default Router;

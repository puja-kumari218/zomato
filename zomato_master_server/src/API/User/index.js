// libraries
import express from "express";
import passport from "passport";

// database model
import { UserModel } from "../../database/allModels";

// intialize Route
const Router = express.Router();

/**
 * Route        /
 * Des          GET authorized user data
 * Params       none
 * Access       Public
 * Method       GET
 */
// http://localhost:4000/user/
Router.get("/", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { email, fullName, phoneNumber, address } =
      req.session.passport.user._doc;

    return res.json({ user: { email, fullName, phoneNumber, address } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /:_id
 * Des          get all user by Id
 * Params       _id
 * Access       Public
 * Method       Get
 */
// http://localhost:4000/user/:_id
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);
    const { fullName } = getUser;

    if (!getUser) {
      return res.status(404).json("User Doesn't Exists.");
    }

    return res.status(200).json({ user: fullName });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: err.message });
  }
});

/**
 * Route        /update
 * Des          Update user data
 * Params       userId
 * Access       Public
 * Method       PUT
 */
Router.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { userData } = req.body;

    const updateUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: userData,
      },
      {
        new: true,
      }
    );

    return res.json({ user: updateUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;

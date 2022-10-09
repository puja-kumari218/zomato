// libraries
import express from "express";

// Models
import { FoodModel } from "../../database/allModels.js";

// Validation
import { validateId, validateCategory } from "../../validation/common.js";

// Create Routes
const Router = express.Router();

/**
 * Route        /:_id
 * Des          GET food based on id
 * Params       _id
 * Access       Public
 * Method       GET
 */
// https://localhost:4000/food/:_id
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.findById(_id);
    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Router       /r
 * Des           GET all food based on particular restaurant.
 * Params       _id : 121221212121
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/food/r/_id

Router.get("/r/_id", async (req, res) => {
  try {
    await validateId(req.params);
    // http://localhost:4000/food/r/121212121
    const { _id } = req.params;
    const foods = await FoodModel.find({ restaurant: _id });
    return res.status(200).json({ foods });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
});

/**
 * Route        /c/:category
 * Des          GET all food based on particular category
 * Params       category
 * Access       Public
 * Method       GET
 */
Router.get("/c/:category", async (req, res) => {
  try {
    await validateCategory(req.params);
    const { category } = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    if (!foods)
      return res
        .status(404)
        .json({ error: `No food matched with ${category}` });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;

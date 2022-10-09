
// libraries
import express from "express";

// Models
import { RestaurantModel } from "../../database/allModels.js";

// Validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant.js";
import { validateId } from "../../validation/common.js";

// Create Routes
const Router = express.Router();

/**
 * Router       /
 * Des          Get all the restaurant details based on city
 * Params       none
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/resturant/

Router.get("/", async(req, res)=>{
    try{
        // http://localhost:4000/resturant/?city=Bokaro
        // await ValidateRestaurantCity(req.query);
        const { city } = req.query;
        const restaurant = await RestaurantModel.find({ city });
        if (restaurant.length == 0){
            return res.json({Error: "NO Restaurant Details Found in your City."});
        }
        return res.status(200).json({restaurant});
    } catch (err){
        return res.status(500).json({Error: err.message});
    }
});

/**
 * Router       /:_id
 * Des          Get all the individuals restaurant on basis of id 
 * Params       id:123132113213
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/resturant/

Router.get("/:_id", async(req, res)=>{
    try{
        await validateId(req.params);
        // http://localhost:4000/resturant/12313213213
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findById(_id); 
        if(!restaurant) return res.status(404).json({Error : " Restaurant Does Not exists / Found"});

        return res.status(200).json({restaurant});
    } catch (err){
        return res.status(500).json({Error: err.message});
    }
});

/**
 * Router       /search
 * Des          Get the restaurant on the Basis Of Search data
 * Params       searchString= name or Restaurant
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/resturant/search/searchString

Router.get("/search/:searchString", async(req, res)=>{
    try{
        await ValidateRestaurantSearchString(req.params);
        // http://localhost:4000/resturant/search/Zaika
        const {searchString} = req.params;
        const restaurant = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i"}
        });
        if(!restaurant) return res.status(404).json({Error : `no Restaurant Match with ${searchString}`});

        return res.status(200).json({restaurant});

    } catch (err){
        return res.status(500).json({Error: err.message});
    }
});


export default Router;
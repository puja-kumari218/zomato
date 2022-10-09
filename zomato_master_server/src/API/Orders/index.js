// Libraries
import express from "express";
import passport from "passport";

// Database Model
import {OrderModel} from '../../database/allModels.js';

const Router = express.Router();

/**
 * Route        /
 * Des          get all order based on parameter _id
 * Params       _id
 * Access       Private
 * Method       Get
*/
// http://localhost:4000/order/_id
Router.get('/:_id', passport.authenticate("jwt"), async(req,res)=>{
    try{
        const {_id} = req.params;
        const getOrder = await OrderModel.findOne({user: _id});

        if(!getOrder) {
            return res.status(404).json("Your Order Not Found.");
        }

        return res.status(200).json({Order: getOrder})
    } catch(err){
        return res.status(500).json({Error: err.message});
    }
});

/**
 * Route        /new/_id
 * Des          place new order route
 * Params       _id
 * Access       Private
 * Method       post
*/
// http://localhost:4000/order/new
Router.post('/new/:_id', passport.authenticate("jwt"), async(req, res)=>{
    try{
        const {_id} = req.params;
        const orderDetails = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
              user: _id,
            },
            {
              $push: { orderDetails },
            },
            { new: true }
        );
      
        return res.json({ order: addNewOrder });

    } catch(err) {
        return res.status(500).json({Error: err.message});
    }
});


export default Router;
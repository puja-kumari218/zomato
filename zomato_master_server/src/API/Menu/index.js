
// libraries
import express from "express";

// Models
import { MenuModel, ImageModel } from "../../database/allModels.js";

// Create Routes
const Router = express.Router();

/**
 * Router       /list
 * Des           GET all list of menu based on particular restaurant _id .
 * Params       _id : 121221212121
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/menu/list/121221212121

Router.get("/list/:_id", async(req, res)=>{
    try{
        const {_id} = req.params;
        const menus = await MenuModel.findById(_id);

        if(!menus) {
            return res.status(404).json({error: "No Menu Present For this restaurant."})
        }

        return res.status(200).json({menus});
    } catch(err){
        return res.status(500).json({ error: err.message });
    }
});

/**
 * Router       /image
 * Des           GET all list of menu images based on particular restaurant _id .
 * Params       _id : 121221212121
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/menu/image/121221212121

Router.get('/images/:_id', async(req, res)=>{
    try{
        const {_id} = req.params;
        const menuImages = await ImageModel.findById(_id);

        if(!menuImages){
            return res.status(404).json({error: "No Images Present For this restaurant."})
        }

        return res.status(200).json({menuImages})

    } catch{
        return res.status(500).json({ error: err.message });
    }
});


export default Router;
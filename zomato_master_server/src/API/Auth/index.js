// libraies
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

// Models
import { UserModel } from "../../database/allModels.js";
import googleConfig from "../../config/google.config.js";

// Validation of credentials.
import { ValidateSignin, ValidateSignup } from '../../validation/auth';

// Create a router
const Router = express.Router();

/**
 * Router       /signup
 * Des          Register new user
 * Params       none
 * Access       Public
 * Method       POST
 */

// http://localhost:4000/auth/signup
Router.post("/signup", async (req,res) => {
    try{
        await ValidateSignup(req.body.credentials);
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({token, status: "Success"});
    }catch(err){
        // console.log(err);
        return res.status(500).json({error: err.message}); 
    }
});

/**
 * Router       /signin
 * Des          Sign in using Email & Passeord
 * Params       none
 * Access       Public
 * Method       POST
 */

// http://localhost:4000/auth/signin
Router.post("/signin", async (req,res) => {
    try{
        await ValidateSignin(req.body.credentials);
        const User = await UserModel.findByEmailAndPass(req.body.credentials);
        const token = User.generateJwtToken();
        return res.status(200).json({token, status: "Success"});
    }catch(err){
        // console.log(err);
        return res.status(500).json({error: err.message}); 
    }
});

/**
 * Router       /google
 * Des          Google Sign Up
 * Params       none
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/auth/google

Router.get("/google", passport.authenticate("google",{
    scope:[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
}));

/**
 * Router       /google/callBack
 * Des          Google Sign Up callback
 * Params       none
 * Access       Public
 * Method       GET
 */

// http://localhost:4000/auth/google/callback

Router.get("/google/callback", passport.authenticate("google",{failureRedirect: "/"}), 
(req,res)=>{
    return res.status(200).redirect(
        `https://zomato-master-client.vercel.app/google/${req.session.passport.user.token}`);
});







// Dummy Code of Understanding.
// Router.post("/signup", async (req,res) => {
//     try{
//         const {email, password, fullName, phoneNumber } = req.body.credentials;
//         const checkUserByEmail = await UserModel.findOne({ email });
//         const checkUserByPhone = await UserModel.findOne({ phoneNumber });

//         if (checkUserByEmail || checkUserByPhone){
//             return res.json({user : "User Already Exists !!"});
//         }
//         // Hashing Password Using Bcrypt.js
//         /**
//          * Hashing and Salting
//          *  you enter a password = 123456 
//          * first step is Hashing; sdfasd324sdsdvask34h423*&^743jdngjkk3457i 
//          * second step is Salting(10); sdfasd324sdsdvask34h423&^*743jdngjkk3457i$%^&*
//          */

//         const bcryptSalt = await bcrypt.genSalt(5);
//         const hashedPassword = await bcrypt.hash(password, bcryptSalt);
        
//         // Storing Data to DataBase
//         await UserModel.create({...req.body.credentials, password: hashedPassword});

//         // Genrate JWT Auth Token .
//         const token = jwt.sign({user: {fullName, email}}, "ZomatoApp");

//         return res.status(200).json({token, status: "Success"});
//     }catch(err){
//         // console.log(err);
//         return res.status(500).json({error: err.message}); 
//     }
// });

export default Router;

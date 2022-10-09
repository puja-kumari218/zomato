// Import Library
require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

// Google Authentication Config Files
import googleAuthConfig from './config/google.config';
// Private Route Config File
import privateRouteConfig from "./config/route.config";

// Database Connection
import ConnectDB from './database/connection.js';

// API Connection
import Auth from "./API/Auth";
import Restaurant from './API/Restaurant';
import Food from './API/Food';
import Menu from './API/Menu';
import Image from './API/Image';
import Order from './API/Orders';
import Review from './API/Reviews';
import User from "./API/User";

// passport Config
googleAuthConfig(passport);
privateRouteConfig(passport);

const PORT = process.env.PORT || 4000;
const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());
// zomato.use(passport.session());


// Application Routes

// http://localhost:4000/
zomato.get("/", (req, res) =>{
    return res.json({"Welcome": `To my backend Software for the Zomato MasterAPI.`});
});
// http://localhost:4000/auth/..
zomato.use("/auth", Auth );
// http://localhost:4000/restaurant/..
zomato.use("/restaurant", Restaurant );
// http://localhost:4000/food/..
zomato.use("/food", Food );
// http://localhost:4000/menu/..
zomato.use("/menu", Menu );
// http://localhost:4000/image/..
zomato.use("/image", Image );
// http://localhost:4000/order/..
zomato.use("/order", Order );
// http://localhost:4000/review/
zomato.use("/review", Review );
// http://localhost:4000/user/
zomato.use("/user", User );


zomato.listen(PORT,() => {
    ConnectDB().then(()=>{
        console.log("Server Of Zomato App is Running....");
    }).catch((err)=>{
        console.log("Server is Running but Database not get Connected.!!");
        console.log(err);
    })
});

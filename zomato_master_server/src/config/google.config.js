import googleOAuth from "passport-google-oauth20";
import { UserModel } from "../database/allModels";
require('dotenv').config();

//  Creating Google Authentication..

const GoogleStrategy = googleOAuth.Strategy; 

export default (passport)=>{
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "https://zomato-app-server.herokuapp.com/auth/google/callback"
            },
            async (accessToken, refreshToken, profile, done)=>{
                // Creating new User
                const newUser = {
                    fullName : profile.displayName,
                    email : profile.emails[0].value,
                    profilePic : profile.photos[0].value
                };

                try{
                    // Check User Exist
                    const user = await UserModel.findOne({email: newUser.email});

                    if(user){
                        // generate token
                        const token = user.generateJwtToken();

                        // return User And Succes Token
                        done(null, {user, token});
                    } else {
                        // Create New User
                        const user = await UserModel.create(newUser);

                        // generate token
                        const token = user.generateJwtToken();

                        // return User And Succes Token
                        done(null, {user, token}); 

                    }

                } catch (err){
                    done(err, null);    
                }
            }
        )
    );
    passport.serializeUser((userData, done) => done(null, { ...userData }));
    passport.deserializeUser((id, done) => done(null, id));
}

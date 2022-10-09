// import { mongoose } from 'mongoose';

// // Creating Schema for movies
// const ImgSchema = new mongoose.Schema({
//    images:[{location: {type: string, required: true}}]   
// },
// {
//    timestamps: true,
//  }
// );

// export const ImageModel = mongoose.model("Images", ImgSchema);

import mongoose from "mongoose";

const ImageSchema = mongoose.Schema(
  {
    images: [
      {
        location: { type: String, required: true }
      },
    ]
  },
  {
    timestamps: true
  }
);

export const ImageModel = mongoose.model("Images", ImageSchema);
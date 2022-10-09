// library
import express from "express";
import multer from "multer";

// Database Model
import { ImageModel } from "../../database/image";

const Router = express.Router();

// multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Utility Function
import { s3Upload } from "../../utils/s3";

/**
 * Route        /
 * Des          Uploads given image to s3 bucket and saves file link to mongodb
 * Params       none
 * Access       Public
 * Method       POST
 */

// Image Routes
// http://localhost:4000/image/
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    // s3 bucket options
    const bucketOptions = {
      Bucket: "zomato-master-va0821",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // Access Controll List
    };
    const uploadImage = await s3Upload(bucketOptions);

    const saveImageToDatabase = await ImageModel.create({
      images: [{ location: uploadImage.Location }],
    });

    return res.status(200).json(saveImageToDatabase);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: err.message });
  }
});

/**
 * Route        /:_id
 * Des          Uploads given image to s3 bucket and saves file link to mongodb
 * Params       none
 * Access       Public
 * Method       GET
 */

// Image Routes
// http://localhost:4000/image/:_id
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const image = await ImageModel.findById(_id);

    return res.status(200).json(image)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: err.message });
  }
});

export default Router;

// Import Packages
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Creating Schema for movies
const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ details: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "ZomatoAPP");
};

UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User Already Exists !!");
  }

  return false;
};

UserSchema.statics.findByEmailAndPass = async ({ email, password }) => {
  // Check whether user exists or not.
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User Doesn't Exists!!");

  // Verify the PassWord in Database.
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) throw new Error("Incorrect Password Or ID.");

  return user;
};

UserSchema.pre("save", function (next) {
  const user = this;

  // Password modified
  if (!user.isModified("password")) return next();

  // Generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // Hash the Password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      // Assign or Update Password
      user.password = hash;
      return next();
    });
  });
});
export const UserModel = mongoose.model("Users", UserSchema);

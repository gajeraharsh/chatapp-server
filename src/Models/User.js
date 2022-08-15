import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User_Schema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Profile_Image: {
      type: String,
    },

    Block: {
      type: Array,
    },
  },
  { timestamps: true }
);

User_Schema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }
  //hash pasword
  const selt = await Bcrypt.genSalt(10);
  this.Password = await Bcrypt.hash(this.Password, selt);
  next();
});

User_Schema.methods.GetToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECERAT, {
    expiresIn: "1h",
  });
};

User_Schema.methods.CheckPassword = async function (Password) {
  return await Bcrypt.compare(Password, this.Password);
};

const User_Model = mongoose.model("Users", User_Schema);
module.exports = User_Model;

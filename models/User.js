import { compare, hash } from "bcrypt";
import mongoose from "mongoose";
import Product from "./Product.js";

const { Schema, model } = mongoose;

const fotoSchema = new Schema(
  {
    fieldname: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgProfile: { type: fotoSchema },
    verified: {
      type: Boolean,
      default: false,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "product" }],
  },
  {
    toJSON: {
      transform: function (doc, data) {
        delete data.password;
        delete data.__v;
        return data;
      },
    },
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  this.email = this.email.toLowerCase();
});

userSchema.post("deleteOne", async function () {
  const id = this.getQuery()._id;

  await Product.deleteMany({ user: id });
});

userSchema.statics.register = async (registerUser) => {
  const hashPassword = await hash(registerUser.password, 7);
  registerUser.password = hashPassword;
  return User.create(registerUser);
};

userSchema.statics.login = async (loginUser) => {
  const user = await User.findOne({
    userName: loginUser.userName,
    email: loginUser.email,
  });
  if (!user) return false;
  const isPasswordCorrect = await compare(loginUser.password, user.password);
  return isPasswordCorrect ? user : false;
};

const User = model("user", userSchema);

export default User;

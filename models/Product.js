import mongoose from "mongoose";
import User from "./User.js";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, data) {
        delete data.__v;
        return data;
      },
    },
  }
);
productSchema.pre("deleteOne", async function () {
  const id = this.getQuery()._id;

  const user = await User.findOne({ products: id });

  user.products = user.products.filter((x) => x.toString() !== id.toString());

  await user.save();
});

const Product = model("product", productSchema);
export default Product;

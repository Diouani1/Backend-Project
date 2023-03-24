import express from "express";
import User from "../models/User.js";
import creatErr from "http-errors";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const addProduct = await Product.create({ ...req.body, user: req.userId });

    const updateUser = await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { products: addProduct._id } }
    );

    res.send(addProduct);
  } catch (error) {
    console.log(error.message);
    next(creatErr(401, error));
  }
});
router.get("/", async (req, res, next) => {
  try {
    const arr = await Product.find({ user: req.userId }).sort({ name: 1 });
    res.send(arr);
  } catch (error) {
    next(creatErr(401, error));
  }
});
router.delete("/:id", async (req,res, next)=>{
    try {
        const deleteOne = await Product.deleteOne({_id: req.params.id})
        res.send(deleteOne)
    } catch (error) {
    next(creatErr(401, error));
        
    }
})
export default router;

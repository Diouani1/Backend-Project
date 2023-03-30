import express from "express";
import User from "../models/User.js";
import creatErr from "http-errors";
import Product from "../models/Product.js";

const router = express.Router();

router.delete("/deleteacount/:id", async (req, res, next) => {
  try {
    if (req.userId === req.params.id) {
      const deletUser = await User.deleteOne({ _id: req.params.id });
      res.clearCookie("token").send({ message: "your Acount is deleted" });

      return;
    }
    next(creatErr(404, "not found"));
  } catch (error) {
    next(creatErr(401, error));
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteOne = await Product.deleteOne({ _id: req.params.id });
    res.send(deleteOne);
  } catch (error) {
    next(creatErr(401, error));
  }
});

export default router;

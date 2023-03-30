import express from "express";
import User from "../models/User.js";
import creatErr from "http-errors";
import jwt from "jsonwebtoken";
import path from "path";

import validLoginInfo from "../middleWare/validLogin.js";

const router = express.Router();

router.post("/login", validLoginInfo, async (req, res, next) => {
  try {
    const loginUser = await User.login(req.body);
    if (!loginUser) return next(creatErr(401, "Invalid Data"));
    if (!loginUser.verified)
      return next(creatErr(404, "please conform your email"));
    const createToken = jwt.sign({ id: loginUser._id }, process.env.SECRET, {
      expiresIn: `${60 * 24}m`,
    });
    res.cookie("token", createToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.send(loginUser);
  } catch (error) {
    next(creatErr(404, error));
  }
});
router.get("/logout", (req, res, next) => {
  console.log("first");
  res
    .clearCookie("token")
    .send({ message: "you are logout and cookies are deleted" });
});
router.get("/:id", async (req, res, next) => {
  try {
    const fotoProfile = await User.findById(req.params.id);

    const fotoProfilePath = path.resolve("./", fotoProfile.imgProfile.path);
    res.sendFile(fotoProfilePath);
  } catch (error) {
    next(creatErr(404, error));
  }
});

export default router;

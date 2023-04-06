import express from "express";
import User from "../models/User.js";
import creatErr from "http-errors";
import multer from "multer";
import sendingEmail from "../middleWare/sendingEmail.js";
import EmailConfirmation from "../models/EmailConfirmation.js";
import validRegisterInfo from "../middleWare/validRegister.js";
import fs from "fs";
const router = express.Router();

const upload = multer({ dest: "uploads/" });

const fotoProfileMiddleWare = upload.fields([
  { name: "fotoProfile", maxCount: 1 },
]);

router.post(
  "/",
  fotoProfileMiddleWare,
  validRegisterInfo,
  async (req, res, next) => {
    const fotoProfile = req.files["fotoProfile"];
    let newUser;

    try {
      if (!fotoProfile) {
        newUser = await User.register(req.body);
      } else {
        newUser = await User.register({
          ...req.body,
          imgProfile: fotoProfile[0],
        });
      }
      res.send(newUser);
      next();
    } catch (error) {
      next(creatErr(477, error));
    }
  },
  sendingEmail
);

router.get("/", async (req, res, next) => {
  try {
    const confirmedEmail = await EmailConfirmation.findOne({
      userId: req.query.userId,
      key: req.query.key,
    });
    if (confirmedEmail.userId) {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.query.userId },
        { verified: true }
      );
      await EmailConfirmation.findOneAndDelete({
        userId: req.query.userId,
        key: req.query.key,
      });
      res.redirect("https://cashier-project.onrender.com/#/login");
    }
  } catch (error) {
    next(creatErr(401, error));
  }
});

router.put("/", fotoProfileMiddleWare, async (req, res, next) => {
  if (!req.files["fotoProfile"]) {
    next(creatErr(401, "please select the file"));
    return;
  }
  try {
    const updateImg = await User.findOneAndUpdate(
      { _id: req.body.id },
      { imgProfile: req.files["fotoProfile"][0] },
      { new: true }
    );

    res.send(updateImg);
  } catch (error) {
    next(creatErr(401, error));
  }
});

export default router;

import { body, validationResult } from "express-validator";
import creatErr from "http-errors";
const validLoginInfo = async (req, res, next) => {
  await body("userName")
    .exists()
    .withMessage("username is Required")
    .trim()
    .run(req);
  await body("email")
    .exists()
    .withMessage("email is Required")
    .isEmail()
    .withMessage("Not a valid Email!")
    .normalizeEmail()
    .trim()
    .run(req);
  await body("password")
    .exists()
    .withMessage("password is Required")
    .isLength({ min: 6, max: 16 })
    .withMessage("password must have between 6 and 16 characters.")
    .run(req);

  const err = validationResult(req);
  if (err.isEmpty()) {
    next();
    return;
  }
  next(creatErr(401, err));
};

export default validLoginInfo;

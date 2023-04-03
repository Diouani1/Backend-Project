import User from "../models/User.js";
import EmailConfirmation from "../models/EmailConfirmation.js";
import sendEmail from "../models/Mail.js";
import creatErr from "http-errors";

const sendingEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      userName: req.body.userName,
    });
    const key = Math.random().toString(20).substring(2, 18);
    const insertConfirmation = await EmailConfirmation.create({
      userId: user._id,
      key,
    });
    const info = await sendEmail(
      req.body.email,
      "verify Your email",
      `
    <h1>Verify Your Email</h1>
    <h2>Dear "${req.body.firstName}"</h2>
    <h4>This is my first Full Stack Project, Thanks for your visit </4>
    <p>

        This email '${req.body.email}', is used to register in our app, <br>
        please visit <a href="https://full-stack-0797.onrender.com//api/user/register?userId=${user._id}&key=${key}">this link</a> To verify your email.
        <br>
        If you not the owner, please ignore the message
        <br>
        Thank You.
    </p>
    `
    );
  } catch (error) {
    next(creatErr(401, error.message));
  }
};
export default sendingEmail;

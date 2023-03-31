import express from "express";
import dotenv from "dotenv";
// import logger from "morgan";
import cookiesParser from "cookie-parser";
import connect from "./lib/DB.js";
// import cors from "cors";
import registerRauter from "./router/registerRouter.js";
import loginRouter from "./router/loginRouter.js";
import productRouter from "./router/productRouter.js";
import deleteRouter from "./router/deleteRouter.js";
import checkAuthorizatio from "./middleWare/checkAuthorization.js";
import path from "path";

dotenv.config();

connect();
const app = express();
app.use(express.static(path.resolve("./", "frontend/build")));

app.use(cookiesParser());

// app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
// app.use(logger("dev"));
// app.use(express.urlencoded({ extended: false }));

app.use("/api/user/register", registerRauter);
app.use("/api/user/login", loginRouter);
app.use("/api/add/product", checkAuthorizatio, productRouter);
app.use("/api/delete", checkAuthorizatio, deleteRouter);

// app.get("*", (req, res) => {
//   // res.sendFile(`${process.argv[1]}/public/index.html`);
// });
app.get("*", (req, res) => {
  const navToLogin = path.resolve("./", "frontend/build/index.html");

  res.sendFile(navToLogin);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err || { message: "Something went Wrong!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server 🇩🇿 🌴 🇪🇭 is listening on  http://localhost:${port}`);
});

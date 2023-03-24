import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookiesParser from "cookie-parser";
import connect from "./lib/DB.js";
import cors from "cors";
import registerRauter from "./router/registerRouter.js";
import loginRouter from "./router/loginRouter.js";
import productRouter from "./router/productRouter.js";
import checkAuthorizatio from "./middleWare/checkAuthorization.js";

dotenv.config();

const app = express();
connect();

app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(cookiesParser());


app.use("/api/user/register", registerRauter);
app.use("/api/user/login", loginRouter);
app.use("/api/add/product", checkAuthorizatio, productRouter);




app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err || { message: "Something went Wrong!" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`The server 🇩🇿 🌴 🇪🇭 is listening on port ${port}`);
});

import mongoose from "mongoose";

const connect = () => {
  mongoose.set("strictQuery", false);
  //   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}/${process.env.DB_NAME}`

  mongoose
    .connect(
      "mongodb+srv://Sahara:IJI4xNkablWJFRid@cluster0.1kf1inv.mongodb.net/test"
    )
    .then(() => {
      console.log(`[DB] is connected`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connect;

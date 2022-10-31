import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import docRouter from "./routes/docRouter.js";

dotenv.config({ path: "./config.env" });

const app = express();

const DB = process.env.MONGO_CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

const connect = () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Mongo Connected Succesfully");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cors());
app.options(cors("*", cors()));
app.use(express.json());
app.use("/api/v1/docData", docRouter);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Connected and App running on port ${port}`);
  } catch (err) {
    console.log(err);
  }
});

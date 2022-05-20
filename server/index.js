import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";

const port = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome tour API!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tour", tourRouter);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  })
  .catch((err) => console.log(err));

import express from "express";
import { authRouter } from "./routes/auth.js";
import { applicationsRouter } from "./routes/applications.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import { requiresAuth } from "./middlewares/requiresAuth.js";
import { Application } from "./models/application.model.js";
import { User } from "./models/user.model.js";

const app = express();
config();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/applications", requiresAuth, applicationsRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    error: "page not found",
    status: 404,
  });
});
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
    app.listen(port, () => console.log(`server started on port ${port}`));
  })
  .catch((err) => {
    console.log("connection failed");
  });

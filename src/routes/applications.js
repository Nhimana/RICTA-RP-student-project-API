import express from "express";
import {
  cancelApplication,
  createApplication,
  getApplication,
  updateApplication,
} from "../controllers/applications.js";
export const applicationsRouter = express.Router();

applicationsRouter.route("/").post(createApplication);

applicationsRouter
  .route("/:id")
  .get(getApplication)
  .delete(cancelApplication)
  .patch(updateApplication);

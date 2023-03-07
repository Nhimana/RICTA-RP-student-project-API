import express from "express";
import { login, register } from "../controllers/auth.js";
export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

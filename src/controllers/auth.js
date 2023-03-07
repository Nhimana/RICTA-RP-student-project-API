import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { password, regno } = req.body;
    const user = await User.create({ regno, password });

    res.status(201).json({
      status: 201,
      data: {
        message: "user account created successfully",
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500 });
  }
};

export const login = async (req, res) => {
  try {
    const { password, regno } = req.body;
    const user = await User.findOne({ regno });
    if (bcrypt.compareSync(password, user.password)) {
      const jwt = Jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "5d",
      });
      res.status(200).json({
        status: 200,
        data: {
          token: jwt,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500 });
  }
};

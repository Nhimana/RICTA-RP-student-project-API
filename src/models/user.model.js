import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    regno: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
export const User = new model("users", userSchema);

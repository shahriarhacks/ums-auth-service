/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.statics.isUserExist = async function (uid: string) {
  return await User.findOne(
    { uid },
    { uid: 1, password: 1, role: 1, needsPasswordChange: 1 },
  );
};

userSchema.statics.isPasswordMatched = async function (
  gPs: string,
  sPs: string,
) {
  return await bcrypt.compare(gPs, sPs);
};

//Hashing Password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bc_salt_round),
  );
  next();
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;

import { Model, Types } from "mongoose";

export type IUser = {
  id?: Types.ObjectId;
  uid: string;
  role: string;
  password: string;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

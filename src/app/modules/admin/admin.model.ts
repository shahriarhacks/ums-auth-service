import { Schema, model } from "mongoose";
import { bloodGroup, gender } from "./admin.constant";
import { AdminModel, IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: String,
      lastName: {
        type: String,
        required: true,
      },
    },
    profileImage: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: "ManagementDepartment",
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);

export default Admin;

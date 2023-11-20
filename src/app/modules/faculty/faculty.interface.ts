import { Model, Types } from "mongoose";

export type FName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  fid: string;
  name: FName;
  profileImage?: string;
  dateOfBirth: string;
  gender: "male" | "female" | "others";
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  permanentAddress: string;
  presentAddress: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  designation: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

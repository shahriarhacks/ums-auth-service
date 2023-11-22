import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

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
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  designation: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  search?: string;
  fid?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: "male" | "female";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  academicDepartment?: string;
  academicFaculty?: string;
  designation?: string;
};

/* eslint-disable no-console */
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { IAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.model";
import { IFaculty } from "../faculty/faculty.interface";
import Faculty from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { IUser } from "./user.interface";
import User from "./user.model";
import {
  generatedAdminId,
  generatedFacultyId,
  generatedStudentId,
} from "./user.utils";

export const createStudentService = async (student: IStudent, user: IUser) => {
  if (!user.password) {
    user.password = config.DEF_STUDENT_PASS as string;
  }
  user.role = "student";

  const session = await mongoose.startSession();
  let newUserAllData: IUser | null;

  try {
    session.startTransaction();

    const academicSemester = await AcademicSemester.findById(
      student.academicSemester,
    ).lean();

    const sid = await generatedStudentId(academicSemester as IAcademicSemester);
    user.uid = sid;
    student.uid = sid;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Failed to create Student, ${error}`,
    );
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        { path: "academicSemester" },
        { path: "academicDepartment" },
        { path: "academicFaculty" },
      ],
    });
  }

  return newUserAllData;
};

export const createFacultyServices = async (faculty: IFaculty, user: IUser) => {
  if (!user.password) {
    user.password = config.DEF_FACULTY_PASS as string;
  }

  user.role = "faculty";

  const session = await mongoose.startSession();
  let newUserAllData: IUser | null;

  try {
    session.startTransaction();

    const fid = await generatedFacultyId();
    user.uid = fid;
    faculty.uid = fid;

    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Faculty");
    }
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Failed to create Faculty ${error}`,
    );
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData.id }).populate({
      path: "faculty",
      populate: [{ path: "academicDepartment" }, { path: "academicFaculty" }],
    });
  }

  return newUserAllData;
};

export const createAdminServices = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.DEF_ADMIN_PASS as string;
  }
  // set role
  user.role = "admin";

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generatedAdminId();
    user.uid = id;
    admin.uid = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty ");
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData.id }).populate({
      path: "admin",
      populate: {
        path: "managementDepartment",
      },
    });
  }

  return newUserAllData;
};

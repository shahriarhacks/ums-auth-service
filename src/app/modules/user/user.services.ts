import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { IFaculty } from "../faculty/faculty.interface";
import Faculty from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { IUser } from "./user.interface";
import User from "./user.model";
import { generatedFacultyId, generatedStudentId } from "./user.utils";

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
    student.sid = sid;

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
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Student");
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findById(newUserAllData.id).populate({
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
    faculty.fid = fid;

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
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Faculty");
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findById(newUserAllData.id).populate({
      path: "faculty",
      populate: [
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }

  return newUserAllData;
};

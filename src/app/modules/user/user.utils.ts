/* eslint-disable no-undefined */
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import Admin from "../admin/admin.model";
import Faculty from "../faculty/faculty.model";
import Student from "../student/student.model";

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await Student.findOne({}, { sid: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.sid ? lastStudent.sid.substring(6) : undefined;
};

export const generatedStudentId = async (
  academicSemester: IAcademicSemester,
) => {
  const currentId = (await findLastStudentId()) || 0;
  const incId = (Number(currentId) + 1).toString().padStart(5, "0");
  const studentId = `S-${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incId}`;
  return studentId;
};

export const findLastFacultyId = async () => {
  const lastFaculty = await Faculty.findOne({}, { fid: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.fid ? lastFaculty.fid.substring(2) : undefined;
};

export const generatedFacultyId = async () => {
  const currentId = (await findLastFacultyId()) || 0;
  const incId = (Number(currentId) + 1).toString().padStart(5, "0");
  const facultyId = `F-${incId}`;

  return facultyId;
};

export const findLastAdminId = async () => {
  const lastAdmin = await Admin.findOne({}, { aid: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.aid ? lastAdmin.aid.substring(2) : undefined;
};

export const generatedAdminId = async () => {
  const currentId = (await findLastAdminId()) || 0;
  const incId = (Number(currentId) + 1).toString().padStart(5, "0");
  const adminId = `A-${incId}`;

  return adminId;
};

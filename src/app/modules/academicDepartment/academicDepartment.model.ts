import { Schema, model } from "mongoose";
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
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

const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
export default AcademicDepartment;

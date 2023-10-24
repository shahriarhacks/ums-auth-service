import { Model } from "mongoose";

export type IAcademicMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type IAcademicSemesterTitle = "Autumn" | "Summer" | "Fall";

export type IAcademicSemesterCode = "01" | "02" | "03";

export type IAcademicSemester = {
  title: IAcademicSemesterTitle;
  year: string;
  code: IAcademicSemesterCode;
  startMonth: IAcademicMonths;
  endMonth: IAcademicMonths;
};

export type academicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;

export type IFiltersType = {
  searchTerm: string;
};

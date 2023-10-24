import {
  IAcademicMonths,
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
} from "./academicSemester.interface";

export const academicSemesterMonths: IAcademicMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const academicSemesterCode: IAcademicSemesterCode[] = ["01", "02", "03"];

export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
export const academicSemesterTitleStartMonthMapper: { [key: string]: string } =
  {
    Autumn: "January",
    Summer: "May",
    Fall: "September",
  };

export const academicSemesterTitleEndMonthMapper: { [key: string]: string } = {
  Autumn: "April",
  Summer: "August",
  Fall: "December",
};

export const searchableFields: Array<string> = [
  "title",
  "code",
  "year",
  "startMonth",
  "endMonth",
];

export const filtersAbleFields: Array<string> = [
  "searchTerm",
  "title",
  "code",
  "year",
  "startMonth",
  "endMonth",
];

import express, { Router } from "express";
import academicDepartmentRoute from "../modules/academicDepartment/academicDepartment.router";
import academicFacultyRoute from "../modules/academicFaculty/academicFaculty.router";
import academicSemesterRoute from "../modules/academicSemester/academicSemester.route";
import managementDepartmentRoute from "../modules/managementDepartment/managementDepartment.route";
import userRoute from "../modules/user/user.router";

const router = express.Router();

type IModuleRouter = { path: string; route: Router };

const moduleRoutes: IModuleRouter[] = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/acs",
    route: academicSemesterRoute,
  },
  {
    path: "/acf",
    route: academicFacultyRoute,
  },
  {
    path: "/acd",
    route: academicDepartmentRoute,
  },
  {
    path: "/md",
    route: managementDepartmentRoute,
  },
];

moduleRoutes.forEach((moduleRoute: IModuleRouter) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

// router.use("/users", userRoute);
// router.use("/acs", academicSemesterRoute);

export default router;

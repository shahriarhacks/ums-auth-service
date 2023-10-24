import express, { Router } from "express";
import academicSemesterRoute from "../modules/academicSemester/academicSemester.route";
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
];

moduleRoutes.forEach((moduleRoute: IModuleRouter) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

// router.use("/users", userRoute);
// router.use("/acs", academicSemesterRoute);

export default router;

import { IManagementDepartment } from "./managementDepartment.interface";
import ManagementDepartment from "./managementDepartment.model";

export const createManagementDepartmentServices = async (
  md: IManagementDepartment,
) => {
  const result = await ManagementDepartment.create(md);
  return result;
};

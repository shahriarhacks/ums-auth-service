import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";

export const authLoginUserServices = async (loginUser: ILoginUser) => {
  const { uid: id, password } = loginUser;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password,
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { uid, needsPasswordChange, role } = isUserExist;

  // Create Access Token

  const accessToken = jwtHelpers.createToken(
    { uid, role },
    config.jwt.sec as Secret,
    config.jwt.expIn as string,
  );

  // Create Refresh Token
  const refreshToken = jwtHelpers.createToken(
    { uid, role },
    config.jwt.ref_sec as Secret,
    config.jwt.ref_expIn as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const refreshTokenServices = async (token: string) => {
  let verifiedUser = null;
  try {
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.ref_sec as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }
  const { uid, role } = verifiedUser;
  const isUserExist = await User.isUserExist(uid);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  const newAccessToken = jwtHelpers.createToken(
    { uid, role },
    config.jwt.sec as Secret,
    config.jwt.expIn as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

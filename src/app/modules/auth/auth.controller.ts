/* eslint-disable no-console */
import { RequestHandler } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { authLoginUserServices, refreshTokenServices } from "./auth.services";

export const authLoginUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...loginData } = req.body;
    const result = await authLoginUserServices(loginData);
    const { refreshToken, ...others } = result;

    //Set Refresh Token into Cookie
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Login Successfully",
      data: others,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const result = await refreshTokenServices(refreshToken);

    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Refresh token generate Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

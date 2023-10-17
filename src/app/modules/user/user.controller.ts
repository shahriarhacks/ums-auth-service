import { RequestHandler } from "express";
import { createUserService } from "./user.services";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await createUserService(user);
    res.status(201).json({
      statusCode: res.statusCode,
      request: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

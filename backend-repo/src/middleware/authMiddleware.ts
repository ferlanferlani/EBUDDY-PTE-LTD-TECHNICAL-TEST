import admin, { messaging } from "firebase-admin";
import { Response, Request, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        errors: {
          code: 401,
          message: "Unauthorized: Token not provided!",
        },
      });
      return;
    }

    // verify token with Firebase SDK
    const tokenDecoded = await admin.auth().verifyIdToken(token);

    // Token is invalid
    if (!tokenDecoded) {
      res.status(401).json({
        success: false,
        errors: {
          statusCode: 401,
          message: "Unauthorized: Invalid token!",
        },
      });
      return;
    }

    // Add information to request
    req.body.user = tokenDecoded;

    // Next to another endpoint
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      errors: {
        statusCode: 401,
        message: "Unauthorized: Token verification failed!",
      },
    });
  }
};

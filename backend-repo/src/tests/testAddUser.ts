import { db } from "../config/firebaseConfig";
import * as argon2 from "argon2";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const testAddUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      email,
      displayName,
      address,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;

    //** request validation **//
    // validate email, password, and confirm password is required
    if (!email || !password || !confirmPassword) {
      res.status(400).json({
        success: false,
        errors: {
          statusCode: 400,
          message: "All fields are required!",
        },
      });
      return;
    }

    // validate password and confirm password must be the same
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        errors: {
          statusCode: 400,
          message: "Password and confirm password must be the same!",
        },
      });
      return;
    }
    // validate password min length 8 character
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Password minimum 8 characters",
      });
      return;
    }

    // encrypt password
    const passwordHashed = await argon2.hash(password);

    // phone number converted
    const phoneNumberConverted = parseInt(phoneNumber);

    // generate uuid
    const uuid = uuidv4();

    const newUserRef = await db.collection("users").add({
      uuid: uuid,
      email: email,
      password: passwordHashed,
      displayName: displayName,
      address: address,
      phoneNumber: phoneNumberConverted,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: "User added successfully!",
      userId: newUserRef,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error adding user:", err.message);

    res.status(500).json({
      success: false,
      errors: {
        statusCode: 500,
        message: "Internal Server Error",
        error: err.message,
      },
    });
  }
};

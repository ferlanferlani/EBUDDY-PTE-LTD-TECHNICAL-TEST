import { Request, Response } from "express";
import { updateUserData, fetchAllUser } from "../repository/userCollection";

// update user by id
type UserData = {
  displayName?: string;
  phoneNumber?: string;
  address?: string;
};

export const updateUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uuid, displayName, phoneNumber, address } = req.body;

    if (!uuid || typeof uuid !== "string") {
      res.status(400).json({
        success: false,
        errors: { statusCode: 400, message: "Invalid or missing UUID!" },
      });
      return;
    }

    const userData: UserData = {};
    if (displayName) userData.displayName = displayName;
    if (phoneNumber) userData.phoneNumber = phoneNumber;
    if (address) userData.address = address;

    if (Object.keys(userData).length === 0) {
      res.status(400).json({
        success: false,
        errors: {
          statusCode: 400,
          message: "At least one field must be provided for update!",
        },
      });
      return;
    }

    await updateUserData(uuid, userData);

    res.status(200).json({
      success: true,
      message: "User data updated successfully!",
      data: { uuid, ...userData },
    });
  } catch (error) {
    const err = error as Error;
    console.log("❌ Update user error:", err.message);

    if (err.message.includes("User not found")) {
      res.status(404).json({
        success: false,
        errors: { statusCode: 404, message: "User not found!" },
      });
    } else if (err.message.includes("No valid fields to update")) {
      res.status(400).json({
        success: false,
        errors: { statusCode: 400, message: "No valid fields to update!" },
      });
    } else {
      res.status(500).json({
        success: false,
        errors: {
          statusCode: 500,
          message: "Internal server error!",
          error: err.message,
        },
      });
    }
  }
};

// get all users
export const fetchAllUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await fetchAllUser();
    console.log(users);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        users.length === 0 ? "No users found" : "Fetch users successfully!",
      data: users,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

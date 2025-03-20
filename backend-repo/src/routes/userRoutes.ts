import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  fetchAllUserController,
  updateUserByIdController,
} from "../controller/api";
import { testAddUser } from "../tests/testAddUser";

const router = express.Router();

// Testing middleware endpoint
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    succcess: true,
    statusCode: 200,
    message: "Protected route accessed!",
    user: req.body.user,
  });
});

// user Endpoints
// fetch user data
router.get(
  "/fetch-user-data",
  // authMiddleware,
  fetchAllUserController
);

// update user data
router.put(
  "/update-user-data",
  // authMiddleware,
  updateUserByIdController
);

// routes testing
router.post("/add-user-data", testAddUser);

export default router;

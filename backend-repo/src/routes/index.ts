import express, { response } from "express";

// imports user route
import userRoutes from "./userRoutes";

const router = express.Router();
router.use(userRoutes);
// Root Endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Root Endpoint",
  });
});
export default router;

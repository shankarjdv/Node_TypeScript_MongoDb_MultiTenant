// routes.ts
import { Router } from "express";
import {
  createUserController,
  createUserController2,
  getUsers,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { verifyToken } from "../middlewares/aurhCheck";

const router = Router();

// router.post('/users', authMiddleware, createUserController);
router.post("/users", verifyToken, createUserController);
router.post("/users2", verifyToken, createUserController2);
router.get("/users2", verifyToken, getUsers);

// Add other routes as needed

export default router;

import express from "express";
import verifyToken from "../middleware/auth.js";
const UserRoute = express.Router();
import {
  signUp,
  signIn,
  getUserById,
  getUserByCategory,
  GetUserPagination,
  updateUser,
  GetAllUsers,
} from "../controllers/UserController.js";

import upload from "../middleware/multer.js";
import { getPeople } from "../controllers/NearbyLocation.js";

UserRoute.get("/get", verifyToken, GetUserPagination);

UserRoute.get("/getNearbyUsers", verifyToken, getPeople);

UserRoute.get("/getUserByCategory/:id", verifyToken, getUserByCategory);

UserRoute.get("/:id", verifyToken, getUserById);

UserRoute.post("/GetAllUsers", verifyToken, GetAllUsers);

UserRoute.post("/login", signIn);

UserRoute.post("/register", signUp);

UserRoute.post(
  "/update",
  [verifyToken, upload("USER").single("user-image")],
  updateUser
);

// UserRoute.put("/activate", verifyToken, activate);

// UserRoute.put("/update", verifyToken, updateUser);

export default UserRoute;

import express from "express";
import verifyToken from "../middleware/auth.js";
const UserRoute = express.Router();
import { signIn, signUp } from "../controllers/AdminController.js";

UserRoute.post("/login", signIn);
UserRoute.post("/signup", signUp);

export default UserRoute;

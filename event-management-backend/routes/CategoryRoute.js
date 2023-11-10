import express from "express";
import verifyToken from "../middleware/auth.js";
const CategoryRoute = express.Router();
import {
  AddCategory,
  GetCategoryPagination,
} from "../controllers/CategoryController.js";
import upload from "../middleware/multer.js";

CategoryRoute.get("/get", GetCategoryPagination);
CategoryRoute.post(
  "/add",
  [verifyToken, upload("CATEGORY").single("category-image")],
  AddCategory
);

export default CategoryRoute;

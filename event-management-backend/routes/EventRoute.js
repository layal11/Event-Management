import express from "express";
import verifyToken from "../middleware/auth.js";
const EventRoute = express.Router();

import {
  AddEvent,
  GetEventById,
  GetEventPagination,
} from "../controllers/EventController.js";
import upload from "../middleware/multer.js";

EventRoute.post(
  "/add",
  [upload("EVENT").array("event-image", 4), verifyToken],
  AddEvent
);
EventRoute.get("/getEventById/:eventId", GetEventById);
EventRoute.get("/get", GetEventPagination);

export default EventRoute;

import Event from "../models/Event.js";
import url from "url";
import mongoose from "mongoose";

export const GetEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({ _id: eventId }) //querying an array //get all events who has at least one category/interest that matches the
      //catId from the params //$ bcz interests is an array //catId is coming from the frontend
      //get events that has this interest
      .populate({ path: "categories", select: "name" })
      .populate({ path: "attendees", select: "name" })
      .populate({ path: "organizers", select: "name" })
      .exec();
    if (event) {
      res.status(200).json({ event, status: true });
    } else {
      res.status(404).json({ status: false, message: `Events not available` });
    }
  } catch (err) {
    handleError(err, res);
  }
};
export const GetEventPagination = async (req, res) => {
  let { limit, offset, search, category } = url.parse(req.url, true).query;
  if (!limit) {
    limit = 10;
  } else {
    limit = parseInt(limit);
  }
  if (!offset) {
    offset = 0;
  } else {
    offset = parseInt(offset);
  }
  let events = [];
  let count = 0;
  let query = undefined;
  if (search) {
    query = {
      $or: [
        { name: { $regex: ".*" + search + ".*" } },
        { description: { $regex: ".*" + search + ".*" } },
      ],
    };
  }
  if (category) {
    query = { ...query, "categories.": new mongoose.Types.ObjectId(category) };
  }
  events = await Event.find(query).limit(limit).skip(offset);
  count = await Event.countDocuments(query); //count all available docs not just the returned ones
  res.json({ count, events, success: true });
};

export const AddEvent = async (req, res) => {
  try {
    let image = [];
    if (req.files && req.files.length > 0) {
      image = req.files.map((img) => {
        return img.path.replace("uploads/", "");
      });
    }
    let { categories, name, organizers, duration, date, description, address } =
      req.body;
    try {
      address = JSON.parse(address);
    } catch (e) {
      address = {};
    }
    try {
      categories = JSON.parse(categories);
    } catch {
      categories = [];
    }
    try {
      organizers = JSON.parse(organizers);
    } catch {
      organizers = [];
    }
    const event = await Event.create({
      categories,
      name,
      organizers,
      image,
      duration,
      date,
      description,
      address,
      attendees: [],
    });
    if (event && event._id) {
      res.json({
        success: true,
        event,
      });
    } else {
      res.json({
        success: false,
        message: "failed to create an event",
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err, res) => {
  res.json({ success: false, message: err.message });
};

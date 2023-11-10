import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  // location: {
  //   type: {
  //     type: String, // Don't do `{ location: { type: String } }`
  //     enum: ["Point"], // 'location.type' must be 'Point'
  //     required: false,
  //     default: "Point",
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: false,
  //   },
  // },
  address: {
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  date: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  image: [
    {
      type: String,
      required: false,
    },
  ],
  categories: [
    //populate
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", //categoryID
    },
  ],
  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Event = mongoose.model("Event", EventSchema);
export default Event;

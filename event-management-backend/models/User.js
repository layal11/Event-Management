import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  authorization: {
    token: {
      type: String,
      required: false,
    },
    exp: {
      type: Date,
      required: false,
    },
  },

  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: false,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
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
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  userType: {
    // member or event org.
    type: Number,
    required: false,
    default: 1,
  },

  isActive: {
    type: Boolean,
    default: true,
    required: false,
  },
});
UserSchema.index({ location: "2dsphere" }, { sparse: true });

const User = mongoose.model("User", UserSchema);
export default User;

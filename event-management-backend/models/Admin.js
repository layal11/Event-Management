import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  userName: {
    type: String,
    required: false,
  },
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
  password: {
    type: String,
    required: false,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;

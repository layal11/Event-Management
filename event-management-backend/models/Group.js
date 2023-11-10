import mongoose from "mongoose";

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  ],
});

const Group = mongoose.model("Group", GroupSchema);
export default Group;

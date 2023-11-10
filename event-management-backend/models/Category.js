import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    isActive: {
        type: String,
        required: false,
    },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;

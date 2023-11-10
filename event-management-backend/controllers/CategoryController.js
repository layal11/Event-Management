import Category from "../models/Category.js";
import url from "url";

export const GetCategoryPagination = async (req, res) => {
  let { limit, offset, search } = url.parse(req.url, true).query;
  if (!limit) {
    limit = 10;
  }
  if (!offset) {
    offset = 0;
  }
  let categories = [];
  let count = 0;
  if (!search) {
    categories = await Category.find().limit(limit).skip(offset);
    count = await Category.countDocuments(); //count all available docs not just the returned ones
  } else {
    categories = await Category.find({
      $or: [{ name: { $regex: ".*" + search + ".*" } }],
    })
      .limit(limit)
      .skip(offset);
    count = await Category.countDocuments({
      $or: [{ name: { $regex: ".*" + search + ".*" } }],
    }); //count all available docs not just the returned ones
  }
  res.json({ count, categories, success: true });
};

export const AddCategory = async (req, res) => {
  try {
    const { name, isActive } = req.body;
    console.log(req.file.path);
    let img = req.file.path;
    img = img.path.replace("uploads/", "");
    const loggedInUser = req.user.user;
    console.log(req.user.user);
    if (loggedInUser && req.user.user.userType === 0) {
      if (name) {
        console.log(name);
        const oldCategory = await Category.findOne({ name: name });
        if (oldCategory) {
          res.status(200).json({ category: oldCategory, status: true });
        } else {
          const category = await Category.create({
            image: img,
            name,
            isActive:
              isActive != undefined && isActive != null ? isActive : false,
          });
          if (category && category._id) {
            res.status(200).json({ category, status: true });
          } else {
            res.status(200).json({ category: {}, status: false });
          }
        }
      } else {
        res.status(403).send("Request data missing");
      }
    } else {
      res.status(400).send("Unauthorized user");
    }
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err, res) => {
  res.json({ success: false, message: err.message });
};

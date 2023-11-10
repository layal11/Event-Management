import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import url from "url";
import fs from "fs";
export const GetAllUsers = async (req, res) => {
  try {
    const { excludeusers } = req.body;
    let query =
      excludeusers && excludeusers.length > 0
        ? { _id: { $nin: excludeusers } }
        : undefined;
    const users = await User.find(query);
    res.json({ users, success: true });
  } catch (e) {
    handleError(e, res);
  }
};
export const GetUserPagination = async (req, res) => {
  let { limit, offset, search } = url.parse(req.url, true).query;
  if (!limit) {
    limit = 10;
  } else {
    try {
      limit = parseInt(limit);
    } catch {
      limit = 10;
    }
  }
  if (!offset) {
    offset = 0;
  } else {
    try {
      offset = parseInt(offset);
    } catch {
      offset = 0;
    }
  }
  let users = [];
  let count = [{ count: 0 }];
  if (!search) {
    users = await User.find().limit(limit).skip(offset);
    count = await User.countDocuments(); //count all available docs not just the returned ones
  } else {
    users = await User.aggregate([
      { $limit: limit },
      { $skip: offset },
      {
        $addFields: {
          fullName: {
            $concat: ["$name", " ", "$lastName"],
          },
        },
      },
      {
        $match: {
          fullName: {
            $regex: ".*" + search + ".*",
            $options: "i",
          },
        },
      },
    ]);

    count = await await User.aggregate([
      {
        $addFields: {
          nameFilter: {
            $concat: ["$name", " ", "$lastName"],
          },
        },
      },
      {
        $match: {
          nameFilter: {
            $regex: ".*" + search + ".*",
            $options: "i",
          },
        },
      },
    ]).count("count"); //count all available docs not just the returned ones
  }
  res.json({ ...count[0], users, success: true });
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({ _id: userId });
    console.log(user);
    if (user) {
      res.status(200).json({ user, status: true });
    } else {
      res.status(404).json({ status: false, message: `User doesn't exist` });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const getUserByCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    console.log("INNN ", { catId });
    const user = await User.find({ "interests.": catId }) //querying an array //get all users who has at least one category/interest that matches the
      //catId from the params //$ bcz interests is an array //catId is coming from the frontend
      //get users that has this interest
      .populate({ path: "interests", select: "name" })
      .exec();
    if (user) {
      res.status(200).json({ user, status: true });
    } else {
      res.status(404).json({ status: false, message: `Users not available` });
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const signUp = async (req, res) => {
  try {
    // Get user input
    const { name, lastName, userType, email, password, userName } = req.body;
    // Validate user input
    if (!(name && lastName && email && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    const oldUser = await User.findOne({ userName: userName });

    if (oldUser) {
      return res.status(409).send("User already exist. Please login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      lastName,
      email,
      password: encryptedPassword,
      userName,
      userType,
    });
    // Create token
    const token = jwt.sign(
      { user: { userType: user.userType, userName } },
      process.env.TOKEN_KEY,
      {
        expiresIn: "10h",
      }
    );
    console.log(token);
    user.authorization.token = token;
    user.save();
    // return new user
    res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    // Get user input
    let image = null;
    if (req.file) {
      image = req.file.path;
    }
    let { _id, name, lastName, email, location, phone, address } = req.body;
    if (location) {
      try {
        location = JSON.parse(location);
      } catch (e) {}
    }
    if (address) {
      try {
        address = JSON.parse(address);
      } catch (e) {}
    }

    // Validate user input
    if (!(name && _id && lastName && email && location && address)) {
      res.status(400).send("All input is required");
    } else {
      // update user in our database
      const user = await User.findOneAndUpdate(
        { _id },
        {
          $set: {
            address,
            phone,
            name,
            location: { ...location, type: "Point" },
            lastName,
            email,
            image,
          },
        }
      );
      if (user && user.image && user.image != "") {
        //delete old image if exists
        fs.unlink(user.image, (err) => {
          if (err) console.log(err);
          else {
            console.log("\nDeleted file: " + user.image);
          }
        });
      }
      res.status(200).json(user);
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const signIn = async (req, res) => {
  try {
    // Get user input
    const { userName, password } = req.body;
    console.log(userName, password);

    // Validate user input
    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ userName: userName });
    console.log(user);
    if (user) {
      const pwdcheck = await bcrypt.compare(password, user.password);
      if (pwdcheck) {
        // Create token
        const token = jwt.sign(
          { user: { userType: user.userType, userName, isAdmin: false } }, //userTypeXYZ: user.userType // getting data from frontend
          process.env.TOKEN_KEY,
          {
            expiresIn: "10h",
          }
        );

        // save user token
        user.authorization.token = token;
        user.save();

        // user
        res.status(200).json(user);
      } else {
        res.status(400).send("Invalid credentials");
      }
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err, res) => {
  res.json({ success: false, message: err.message });
};

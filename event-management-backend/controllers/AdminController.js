import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    // Get user input
    const { password, userName } = req.body;
    // Validate user input
    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    const oldUser = await Admin.findOne({ userName: userName });

    if (oldUser) {
      return res.status(409).send("User already exist. Please login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Admin.create({
      password: encryptedPassword,
      userName,
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
    res.status(201).json(user);
  } catch (err) {
    handleError(err, res);
  }
};

export const signIn = async (req, res) => {
  try {
    // Get user input
    const { userName, password } = req.body;

    // Validate user input
    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Admin.findOne({ userName: userName });
    console.log(user);
    const pwdcheck = await bcrypt.compare(password, user.password);
    if (user && pwdcheck) {
      // Create token
      const token = jwt.sign(
        { user: { userName, isAdmin: true } }, //userTypeXYZ: user.userType // getting data from frontend
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
  } catch (err) {
    handleError(err, res);
  }
};

// export const deleteUsers = async (req, res) => {

// };

// export const updateUsers = async (req, res) => {
//   //
// };

const handleError = (err, res) => {
  res.json({ success: false, message: err.message });
};

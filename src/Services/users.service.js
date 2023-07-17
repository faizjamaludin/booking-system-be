const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

// get user from database using id
const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// make first letter uppsercase
const capitalizeWords = (str) => {
  if (!str) {
    return "";
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// register user
const createUser = async (userData, next) => {
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  if (userData.password === userData.cpassword) {
    try {
      const user = new User({
        fullName: capitalizeWords(userData.fullName),
        email: userData.email,
        phone: userData.phone,
        password: hashedPassword,
      });

      user.save();
    } catch (error) {
      console.log(error);
    }
  }
};

const loginUser = async (userData, next) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    const err = "Invalid email or password";
    // err.status = 401;
    return err;
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) {
    const err = new Error("Invalid email or password");
    // err.status = 401;
    return next(err);
  }

  data = {
    userId: user._id,
    email: user.email,
    name: user.full_name,
  };

  const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });

  return { user, token };
};

module.exports = {
  getUser,
  createUser,
  loginUser,
};

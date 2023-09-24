const userService = require("../Services/users.service");

// get user based on id
const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// create user
const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    // res.status(201).send({ message: 'register successful' });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    const { user, token } = await userService.loginUser(req.query, next);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = {
  getUser,
  createUser,
  loginUser,
};

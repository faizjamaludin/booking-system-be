const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  dateCreated: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

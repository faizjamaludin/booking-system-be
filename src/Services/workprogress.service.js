const WorkProgress = require("../Models/workProgressModel");
const nodemailer = require("nodemailer");

const createWork = (data) => {
  const workProgress = new WorkProgress();
};

module.exports = {
  createWork,
};

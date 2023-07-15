const WorkProgress = require("../Models/workProgressModel");
const nodemailer = require("nodemailer");

const getWork = async () => {
  const workProgress = await WorkProgress.find()
    .populate("booking")
    .sort({ startDate: 1 });

  return workProgress;
};

module.exports = {
  getWork,
};

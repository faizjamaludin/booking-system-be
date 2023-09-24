const workProgressService = require("../Services/workprogress.service");
const bookingService = require("../Services/booking.service");
const nodemailer = require("nodemailer");

const getWork = async (req, res, next) => {
  try {
    const workProgress = await workProgressService.getWork();
    res.status(200).json(workProgress);
  } catch (error) {
    console.log(error);
  }
};

const doneWork = async (req, res) => {
  try {
    const workProgress = await workProgressService.doneWork(req);
    res.status(201).json(workProgress);
  } catch (error) {
    console.log(error);
  }
};

const getUserWorkProgress = async (req, res, next) => {
  try {
    const workProgress = await workProgressService.getUserWorkProgress(req);
    res.status(200).json(workProgress);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWork,
  doneWork,
  getUserWorkProgress,
};

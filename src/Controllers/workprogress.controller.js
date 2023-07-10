const workProgressService = require("../Services/workprogress.service");
const nodemailer = require("nodemailer");

const createWork = async (req, res, next) => {
  try {
    const workProgress = await workProgressService.createWork(req.body);
    res.status(200).json(workProgress);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createWork,
};

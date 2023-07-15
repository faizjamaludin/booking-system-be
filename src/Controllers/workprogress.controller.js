const workProgressService = require("../Services/workprogress.service");
const nodemailer = require("nodemailer");

const getWork = async (req, res, next) => {
  try {
    const workProgress = await workProgressService.getWork();
    res.status(200).json(workProgress);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getWork,
};

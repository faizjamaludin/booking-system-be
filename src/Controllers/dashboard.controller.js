const dashboardService = require("../Services/dashboard.service");

const getAllData = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getAllData();
    res.status(200).json(dashboard);
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getUserData(req);
    res.status(200).json(dashboard);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllData,
  getUserData,
};

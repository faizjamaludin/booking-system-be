const Product = require("../Models/productModel");
const WorkProgress = require("../Models/workProgressModel");
const Booking = require("../Models/bookingModel");

const getAllData = async () => {
  const product = await Product.count();
  const workProgress = await WorkProgress.count({ workStatus: "In Progress" });
  const workDone = await WorkProgress.count({ workStatus: "Done" });
  const booking = await Booking.count();

  return { product, workProgress, workDone, booking };
};

const getUserData = async (data) => {
  const userBookingId = [];
  const workData = [];
  var workDone = 0;
  var workInProgress = 0;
  var work;

  const userEmail = data.params.email;

  const booking = await Booking.find({ email: userEmail });
  const totalBooking = booking.length;

  // set booking id for how many user booking
  for (let i = 0; i < booking.length; i++) {
    userBookingId.push(booking[i]._id);
  }

  // find and count workprogress in progress and done
  for (let j = 0; j < userBookingId.length; j++) {
    work = await WorkProgress.find({ booking: userBookingId[j] });
    workData.push(work);
  }

  // set done and in progress
  for (let z = 0; z < workData.length; z++) {
    workData[z].map((item, index) => {
      if (item.workStatus === "Done") {
        workDone += 1;
      }

      if (item.workStatus === "In Progress") {
        workInProgress += 1;
      }
    });
  }

  return { totalBooking, workInProgress, workDone };
};

module.exports = {
  getAllData,
  getUserData,
};

const express = require("express");
const mongoose = require("mongoose");

// const upload = multer({ dest: 'Assets/' })

require("dotenv").config();

const cors = require("cors");

// set express
const app = express();
app.use(express.json());
app.use(cors());

// Set variable
var usersRouter = require("./src/Routes/user.routes");
var productRouter = require('./src/Routes/product.routes')
var bookingRouter = require('./src/Routes/booking.routes')

var PORT = process.env.PORT;
var PASS_MONGODB = process.env.PASSWORD_MONGODB;

// Connect to database
mongoose
  .connect(
    `mongodb+srv://admin:${PASS_MONGODB}@bookingsystemapi.thoioma.mongodb.net/BookingSystemAPI?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

//   Mount Routes
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/booking", bookingRouter);


// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

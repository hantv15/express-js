const express = require("express");
const nodemailer = require("nodemailer");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// IMPORT ROUTE
const sendMailRoute = require("./src/routes/sendMail");
const authRoute = require('./src/routes/auth');
const userRoute = require("./src/routes/user");
// END IMPORT ROUTE
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
   console.log("CONNECTED TO MONGO DB")
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());
//router
app.use("/api/email", sendMailRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.listen(8000, () => {
   console.log("Server is running port 8000");
})

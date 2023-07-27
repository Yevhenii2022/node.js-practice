const path = require("path");
const express = require("express");
require("colors");
const connectDB = require("../config/connectDB");
const errorHandler = require("../backend/middlewares/errorHandler");
const envPath = path.join(__dirname, "..", "config", ".env");

require("dotenv").config({ path: envPath });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", require("./routes/carsRoutes"));

app.use(errorHandler);

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`.green.italic.bold)
);

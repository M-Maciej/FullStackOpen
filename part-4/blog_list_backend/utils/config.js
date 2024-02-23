require("dotenv").config();
const PORT = process.env.PORT || 32001;
const MONGODB_URI = process.env.MONGODB_URI;
const hostname = "0.0.0.0";

module.exports = {
  PORT,
  MONGODB_URI,
  hostname,
};

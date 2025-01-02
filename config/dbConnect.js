const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;

// Connect to MongoDB

const dbConnect = mongoose
  .connect(URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("db connection error: ");
    console.error(err);
    process.exit(1);
  });

module.exports = dbConnect;

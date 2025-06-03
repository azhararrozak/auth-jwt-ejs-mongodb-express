const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDBStatus = await mongoose.connect(process.env.MONGO_URI);

    if (connectDBStatus) {
      console.log("MongoDB Connected: " + connectDBStatus.connection.host);
    }else {
      console.error("Failed to connect to MongoDB");
      process.exit(1); // Exit process with failure
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

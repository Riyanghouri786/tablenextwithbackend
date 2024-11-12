import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already Connected");
    return;
  }
  if (mongoose.connection.readyState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    await mongoose.connect(DB_URL, {
      dbName: "Riyan",
      bufferCommands: false,
    });
    console.log("Connected");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export default connect;

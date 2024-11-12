import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;
let isConnected = false; // Keep track of the connection status

const connect = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(DB_URL, {
      dbName: "Riyan",
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Database connection failed");
  }
};

export default connect;

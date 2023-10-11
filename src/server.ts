import mongoose from "mongoose";
import app from "./app";
import http from "http";
import config from "./config/index";

const server = http.createServer(app);

async function connectDB() {
  try {
    await mongoose.connect(config.DB_URI as string);
    console.log(`DB Connected Successfully`);
    server.listen(config.port, () => {
      console.log(`Server Connected Successfully on port ${config.port}`);
    });
  } catch (error) {
    console.log(`DB connected Failed ${error}`);
  }
}
connectDB();

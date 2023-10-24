import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { errorLog, log } from "./shared/logger";

process.on("uncaughtException", error => {
  errorLog.error(error);
  process.exit(1);
});

let server: Server;
async function connectDB() {
  try {
    await mongoose.connect(config.LOCAL_URI as string);
    log.info(`DB Connected Successfully`);
    server = app.listen(config.port, () => {
      log.info(`Server Connected Successfully on port ${config.port}`);
    });
  } catch (error) {
    errorLog.error(`DB connected Failed ${error}`);
  }

  process.on("unhandledRejection", error => {
    if (server) {
      server.close(() => {
        errorLog.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
connectDB();

process.on("SIGTERM", () => {
  log.info("SIGTERM is received");
  if (server) {
    server.close();
  }
});

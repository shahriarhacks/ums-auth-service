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

async function bootstrap() {
  try {
    await mongoose.connect(config.DB_URI as string);
    log.info(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      log.info(`Application  listening on port ${config.port}`);
    });
  } catch (error) {
    errorLog.error("Failed to connect database", error);
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

bootstrap();

// process.on("SIGTERM", () => {
//   log.info("SIGTERM is received");
//   if (server) {
//     server.close();
//   }
// });

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  DB_URI: process.env.DB_URI,
  DEF_PASS: process.env.USER_DEF_PASS,
};

export default config;

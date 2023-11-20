import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  DB_URI: process.env.DB_URI,
  LOCAL_URI: process.env.LOCAL_DB_URI,
  DEF_STUDENT_PASS: process.env.STUDENT_DEF_PASS,
  DEF_FACULTY_PASS: process.env.FACULTY_DEF_PASS,
};

export default config;

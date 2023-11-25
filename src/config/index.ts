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
  DEF_ADMIN_PASS: process.env.ADMIN_DEF_PASS,
  bc_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    sec: process.env.JWT_SEC,
    expIn: process.env.JWT_EXP,
    ref_sec: process.env.JWT_REF_SEC,
    ref_expIn: process.env.JWT_REF_EXP,
  },
};

export default config;

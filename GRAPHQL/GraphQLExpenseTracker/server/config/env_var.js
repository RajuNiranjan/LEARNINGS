import dotenv from "dotenv";
dotenv.config();

export const ENV_VAR = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};

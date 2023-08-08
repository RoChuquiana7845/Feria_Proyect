import { config } from "dotenv";
config({ path: process.ENV });

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.BACKEND_MONGO_URL,
  SECRET_KEY :process.env.SECRET_KEY,
  BACKEND_URL: process.env.BACKEND_URL,
  KEY: process.env.KEY
};

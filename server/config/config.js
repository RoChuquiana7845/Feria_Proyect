import { config } from "dotenv";
config({ path: process.ENV });

export default {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.BACKEND_MONGO_URL || "mongodb://localhost:27017/feria",
  SECRET_KEY :process.env.SECRET_KEY || 'Secreto',
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:3000/",
  KEY: process.env.KEY || "key"
};

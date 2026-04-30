import dotenv from "dotenv";
// let us load the dotenv package 
dotenv.config();

// let us use functions for professionalism and well structure 
// this is the function for getting the env value for all the configured ones and throws an error if env value missed
const getEnv/* for string env gusa*/ = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing ${key}`);
  return value;
};
/*for integer env like PORT NUMBER*/
const getNumberEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing ${key}`);
  const num = Number(value);
  if (isNaN(num)) throw new Error(`Invalid ${key}`);
  return num;
};

export const env = {
  PORT: getNumberEnv("PORT"),
  NODE_ENV: getEnv("NODE_ENV"),
  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),
  CLIENT_URL: getEnv("CLIENT_URL"),
  MONGODB_URI: getEnv("MONGODB_URI"),
  EMAIL_PASS: getEnv("EMAIL_PASS"),
  EMAIL_USER: getEnv("EMAIL_USER"),
};

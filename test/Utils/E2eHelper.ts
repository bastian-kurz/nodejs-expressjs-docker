// base url for end 2 end testing based on the .env APP_PORT variable
import dotenv from 'dotenv';

//load dotenv config
dotenv.config();
export const E2eBaseUrl = `http://localhost:${process.env.APP_PORT}`;

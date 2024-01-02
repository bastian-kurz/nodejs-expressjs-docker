import dotenv from 'dotenv';
import path from 'path';

export const EnvLoader = () => {
  const env: string|undefined = process.env.NODE_ENV;

  if (!env || env === 'develop') {
    dotenv.config({ path: path.resolve(path.join('.env.develop')) });
    return;
  }

  if (env === 'test') {
    dotenv.config({ path: path.resolve(path.join('.env.test')) });
    return;
  }

  dotenv.config(); // .env is the default, and we use it for production environment
};

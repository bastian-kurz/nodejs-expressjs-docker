// base url for end 2 end testing based on the .env APP_PORT variable
import { EnvLoader } from '#src/Core/Framework/Util/Env';

//load dotenv config
EnvLoader();

export const E2eBaseUrl = `http://localhost:${process.env.APP_PORT}`;

import dotenv from 'dotenv';
import express, { Application, urlencoded } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import HealthRoute from '#src/Core/Api/Routes/HealthRoute';
import swaggerUi from 'swagger-ui-express';

//Load project .env file
dotenv.config();

const port: number = Number(process.env.APP_PORT) || 3000;
const app: Application = express();

app.get('/ping', async (_req, res) => {
  res.send({
    message: 'pong',
  });
});

// Use body parser to read sent json payloads
app.use(urlencoded({ extended: true }));
app.use(express.json());

// Use morgan logger
app.use(morgan(process.env.MORGAN_LOG_OUTPUT || 'common'));

// Use directory for public static files
app.use(express.static('public'));

// Add swagger middleware
app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, {
  swaggerOptions: {
    url: '/swagger.json',
  },
}));

//Add all routes
app.use(HealthRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});

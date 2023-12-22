import dotenv from 'dotenv';
import express, { Application, urlencoded } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import Db from '#src/Core/DataAbstractionLayer/DynamoDb/Db';
import { ErrorHandler404, GlobalErrorHandler } from '#src/Core/Framework/Middleware/ErrorHandler';
import ExampleController from '#src/App/Api/Controller/ExampleController';
import HealthController from '#src/Core/Api/Controller/HealthController';
import compression from 'compression';
import helmet from 'helmet';

function main(): void {
  //Load project .env file
  dotenv.config();
  const app: Application = express();

  registerMiddleware(app);
  registerDatabase();
  registerRoutes(app);
  registerErrorHandler(app);
  startServer(app);
}

function startServer(app: Application): void {
  const port: number = Number(process.env.APP_PORT) || 3000;

  // Start server
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  process.on('SIGTERM', () => {
    console.info('SIGTERM signal received');
    server.close(() => {
      Db.instance()?.shutdown();
      process.exit(0);
    });
  });
}

function registerMiddleware(app: Application): void {
  /**
   * Helmet helps secure Express apps by setting HTTP response headers.
   * @link https://www.npmjs.com/package/helmet
   * @link https://github.com/helmetjs/helmet
   */
  app.use(helmet());
  
  // Use body parser to read sent json payloads
  app.use(urlencoded({ extended: true }));
  app.use(express.json());

  // Use morgan logger
  app.use(morgan(process.env.MORGAN_LOG_OUTPUT || 'common'));

  // Use directory for public static files
  app.use(express.static('public'));

  // Gzip compressing can greatly decrease the size of the response body
  app.use(compression());

  // Add swagger middleware
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }));
}

function registerDatabase(): void {
  Db.instance();
}

/**
 * Add new routes here to be able to publish them to the www
 */
function registerRoutes(app: Application): void {
  //Add all routes
  app.use(new HealthController().buildRoutes());
  app.use(new ExampleController().buildRoutes());
}

function registerErrorHandler(app: Application): void {
  // No route matched e.g. 404 not found response
  app.use(ErrorHandler404);

  // Global error handler
  app.use(GlobalErrorHandler);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}

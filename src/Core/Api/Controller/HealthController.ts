import e, { Request, Response, Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import expressAsyncHandler from 'express-async-handler';
import { HttpStatusCode } from 'axios';
import express from 'express';

export default class HealthController {
  private readonly basePath = '/healthy';
  
  public buildRoutes(): e.Router {
    const router: Router = express.Router();
    router.get(
      `${this.basePath}`,
      expressAsyncHandler(
        async (_req: Request, res: Response): Promise<void> => {
          res.status(HttpStatusCode.NoContent).json(undefined);
        }),
    );

    return router;
  }
}

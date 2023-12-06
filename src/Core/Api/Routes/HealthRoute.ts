import express, { Router } from 'express';
import HealthController from '#src/Core/Api/Controller/HealthController';
import { HttpStatusCode } from 'axios';

const router: Router = express.Router();
const controller: HealthController = new HealthController();
router.get('/healthy', async (_req, res) => {
  await controller.healthy();
  return res.status(HttpStatusCode.NoContent).json(undefined);
});

export default router;

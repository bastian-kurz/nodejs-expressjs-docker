import { NextFunction, Request, Response } from 'express';

export const NextPageQueryParam = (req: Request, res: Response, next: NextFunction): void => {
  const nextPage = req.query.next;
  
  if (!nextPage) {
    next();
  }
  
  // const queryParam: OneParams = { next: String(nextPage) };
};

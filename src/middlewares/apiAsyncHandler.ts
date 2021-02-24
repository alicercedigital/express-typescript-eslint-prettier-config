import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const apiAsyncHandler = (callback: AsyncFunction) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return await callback(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export default apiAsyncHandler;

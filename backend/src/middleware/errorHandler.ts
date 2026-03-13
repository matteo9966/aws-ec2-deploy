import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
//   skip unused parameter warning for next since it's required for error handling middleware
// eslint-disable-next-line 
  _next: NextFunction
): void => {
  const message =
    error instanceof Error ? error.message : 'Internal server error';

  response.status(500).json({
    error: message
  });
};

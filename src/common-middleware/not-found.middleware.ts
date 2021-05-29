import { Request, Response, NextFunction } from 'express';

// NB: Ensure this meddleware is the last one since it acts as a catchall
const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
  const message = 'Resource not found';

  response.status(404).send(message);
};

export default notFoundHandler;

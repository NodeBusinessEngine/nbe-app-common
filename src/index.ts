import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import actuator from 'express-actuator';
import errorHandler from './common-middleware/error.middleware';
import notFoundHandler from './common-middleware/not-found.middleware';

export const BaseExpress = express();
export function GetNBEBaseServer(expressBase: any, routes: any[] = [], customMiddleware: any[] = []) {
  const app = expressBase || express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(actuator());
  // Add the Custom Middleware
  // NB: Add Logger (Morgan) and Authentication as Custom Middleware
  if (customMiddleware.length > 0) {
    for (const middleWare of customMiddleware) {
      app.use(middleWare)
    }
  }
  // Add the Custome Routes
  if (routes.length > 0) {
    for (const route of routes) {
      const {baseUrl = '', handler = undefined} = route;
      if(baseUrl && handler) app.use(baseUrl, handler)
    }
  }
  app.use(errorHandler);
  app.use(notFoundHandler);
  return app;
}
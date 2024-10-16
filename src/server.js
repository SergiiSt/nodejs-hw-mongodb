import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/sotrOrder.js';
import swaggerDocs from '../src/middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();
  // const logger = pino({
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // });
  // app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);
  app.use('/api-docs', swaggerDocs());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

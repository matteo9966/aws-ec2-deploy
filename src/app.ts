import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { router } from './routes';

export const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorHandler);

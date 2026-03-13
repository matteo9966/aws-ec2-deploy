import cors from 'cors';
import express from 'express';
import { environment } from './config/environment';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { router } from './routes';

export const app = express();

app.use(express.json());
app.use(
	cors({
		origin: environment.FRONTEND_URL
	})
);
app.use(requestLogger);
app.use(router);
app.use(errorHandler);

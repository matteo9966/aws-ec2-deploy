import { Router } from 'express';
import path from 'node:path';

export const router = Router();

router.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

router.get('/home', (_request, response) => {
  response.sendFile(path.join(process.cwd(), 'public', 'home.html'));
});

import { Router } from 'express';
import path from 'node:path';
import { getUsers, /* getPresignedUrl */ } from '../controllers/users.controller';
import { listItemsInBucket } from '../controllers/s3.controller';

export const router = Router();

router.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

router.get('/home', (_request, response) => {
  response.sendFile(path.join(process.cwd(), 'public', 'home.html'));
});

router.get('/users', getUsers);
// router.get('/presigned-url', getPresignedUrl);

router.get('/list-items-in-bucket', listItemsInBucket);

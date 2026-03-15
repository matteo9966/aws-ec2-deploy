import { Router } from 'express';
import path from 'node:path';
import { getUsers, /* getPresignedUrl */ } from '../controllers/users.controller';
import { listItemsInBucket } from '../controllers/s3.controller';

export const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns the health status of the API
 */
router.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Serve the home page
 *     responses:
 *       200:
 *         description: Returns the home page HTML
 */
router.get('/home', (_request, response) => {
  response.sendFile(path.join(process.cwd(), 'public', 'home.html'));
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: Returns a list of users
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /list-items-in-bucket:
 *   get:
 *     summary: List items in an S3 bucket
 *     responses:
 *       200:
 *         description: Returns a list of items in the bucket
 */
router.get('/list-items-in-bucket', listItemsInBucket);


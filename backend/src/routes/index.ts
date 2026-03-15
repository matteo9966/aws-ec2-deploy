import { Router } from "express";
import path from "node:path";
import {
  getUsers /* getPresignedUrl */,
} from "../controllers/users.controller";
import { listItemsInBucket } from "../controllers/s3.controller";
import { upload } from "../lib/multer";

import { uploadMultiplePhotos } from "../controllers/photo.controller";
import { getAllPhotos } from "../services/photo.service";

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
router.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
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
router.get("/home", (_request, response) => {
  response.sendFile(path.join(process.cwd(), "public", "home.html"));
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
router.get("/users", getUsers);

/**
 * @swagger
 * /list-items-in-bucket:
 *   get:
 *     summary: List items in an S3 bucket
 *     responses:
 *       200:
 *         description: Returns a list of items in the bucket
 */
router.get("/list-items-in-bucket", listItemsInBucket);

/**
 * @swagger
 * /upload-multiple-photos:
 *   post:
 *     summary: Upload multiple photos to S3 and save metadata to the database
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of image files to upload
 *      
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 uploaded:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: No files uploaded
 */
router.post(
  "/upload-multiple-photos",
  upload.array("files", 10),
  uploadMultiplePhotos
);

/**
 * @swagger
 * /get-photos:
 *   get:
 *     summary: Retrieve a list of photos
 *     responses:
 *       200:
 *         description: Returns a list of photos
 *       500:
 *         description: Failed to fetch photos
 */
router.get("/get-photos", async (req, res) => {
  try {
    const photos = await getAllPhotos(); 
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});
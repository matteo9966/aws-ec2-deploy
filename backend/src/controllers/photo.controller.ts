import { Request, Response } from "express";
import { s3Client } from "../lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../lib/prisma";
import { Photo } from "../../prisma/generated/prisma/client";
import { createPhoto, getAllPhotos } from "../services/photo.service";

export const uploadMultiplePhotos = async (req: Request, res: Response) => {
  try {
    const files = req.files || [];

    if (!files.length) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedFiles = files as Express.Multer.File[];
    const results: Partial<Photo>[] = [];

    // Upload files to S3 and prepare metadata
    const uploads = uploadedFiles.map(async (file) => {
      const key = `uploads/${Date.now()}-${file.originalname}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      results.push({
        s3Key: key,
        fileSize: file.size,
        description: file.originalname,
      });
    });

    await Promise.all(uploads);

    // Save metadata to the database
    await prisma.photo.createMany({
      data: results.map((r) => ({
        s3Key: r.s3Key!,
        fileSize: r.fileSize!,
        description: r.description!,
      })),
    });

    res.status(200).json({ message: "Files uploaded successfully", uploaded: results });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export async function handleCreatePhoto(req: Request, res: Response) {
  try {
    const photo = await createPhoto(req.body);
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create photo" });
  }
}

export async function handleGetPhotos(req: Request, res: Response) {
  try {
    const photos = await getAllPhotos();
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
}
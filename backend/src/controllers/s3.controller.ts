import { s3Client } from '../lib/aws';
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export const listItemsInBucket = async (_req:Request, res:Response) => {
  try {
    // List objects in the bucket
    const listCommand = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const listResponse = await s3Client.send(listCommand);

    if (!listResponse.Contents) {
      return res.status(200).json({ items: [] });
    }

    // Generate signed URLs for each object
    const items = await Promise.all(
      listResponse.Contents.map(async (item) => {
        const signedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({ Bucket: BUCKET_NAME, Key: item.Key! }),
          { expiresIn: 24 * 60 * 60 } // 24 hours
        );
        return { key: item.Key, signedUrl };
      })
    );

    res.status(200).json({ items });
  } catch (error) {
    console.error('Error listing items in bucket:', error);
    res.status(500).json({ error: 'Failed to list items in bucket' });
  }
};
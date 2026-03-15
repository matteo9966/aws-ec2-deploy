import { Request, Response } from 'express';
import { User } from '@aws-ec2-deploy/types';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const mockUser: User = {
  id: '1',
  name: 'Mock User',
  email: 'mock.user@example.com',
};

const s3 = new S3Client({ region: "us-east-1" });

export const getUsers = (_request: Request, response: Response): void => {
  response.status(200).json({ data: [mockUser] });
};

// export async function getPresignedUrl(req, res) {
//     const bucketName = "your-bucket-name";
//     const objectKey = req.query.key; // The asset key requested by the user

//     try {
//         const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey });
//         const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
//         res.json({ url });
//     } catch (error) {
//         console.error("Error generating presigned URL", error);
//         res.status(500).json({ error: "Failed to generate presigned URL" });
//     }
// }

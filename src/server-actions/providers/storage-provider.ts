import { env } from "@/lib/env";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

export class StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: env.BUCKET_MEDIA_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY_ID,
      },
    });
  }

  async uploadFile(file: File): Promise<string> {
    try {
      const [originalName, fileExtension] = file.type.split("/");

      const fileName = `${originalName}_${randomUUID()}.${fileExtension}`;

      const Body = await file.arrayBuffer();

      await this.client.send(
        new PutObjectCommand({
          Bucket: env.BUCKET_MEDIA_NAME,
          Key: fileName,
          Body: Buffer.from(Body),
          ACL: "public-read",
        })
      );

      const url = `https://${env.BUCKET_MEDIA_NAME}.s3.${env.BUCKET_MEDIA_REGION}.amazonaws.com/${fileName}`;

      return url;
    } catch (error) {
      console.error("Error uploading file to S3 - ", error);
      throw new Error("Error uploading file to S3");
    }
  }
}

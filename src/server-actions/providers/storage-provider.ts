import { env } from "@/lib/env";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import { Readable } from "node:stream";

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

  async downloadFile(key: string): Promise<string | undefined> {
    try {
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: env.BUCKET_MEDIA_NAME,
          Key: key,
        })
      );

      if (!response.Body) return undefined;

      const outputPath = join(process.cwd(), "tmp", key);

      const writeStream = createWriteStream(outputPath);

      // use stream to parse the response.Body
      Readable.from([response.Body.transformToByteArray()]).pipe(writeStream);

      await new Promise(resolve => writeStream.on("finish", resolve));

      console.log("🚀 ~ outputPath:", outputPath);

      return "";
    } catch (error) {
      console.error("Error downloading file from S3 - ", error);
      throw new Error("Error downloading file from S3");
    }
  }
}

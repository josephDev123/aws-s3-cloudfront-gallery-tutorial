import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { pool } from "../../db";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const title = formData.get("title");
  const desc = formData.get("desc");
  // console.log(file);

  try {
    const connection = await pool.getConnection();
    const sql = "INSERT INTO gallery (title, des, filename) VALUES (?, ?, ?)";
    // initiate client and configuration
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });

    console.log(
      "aws secret",
      process.env.AWS_ACCESS_KEY,
      process.env.AWS_SECRET_ACCESS_KEY
    );
    const buffer = Buffer.from(await file.arrayBuffer());

    const params: PutObjectCommandInput = {
      Bucket: "aws-s3-cloudfront-testing-bucket",
      Key: `testing/${file.name}`,
      Body: buffer,
    };

    // initiate command  and parameter
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("final: ", response);

    const [row] = await connection.execute(sql, [
      title,
      desc,
      `testing/${file.name}`,
    ]);
    console.log(row);

    return Response.json({ message: "successful" }, { status: 200 });
  } catch (error) {
    console.log("error on upload", error);
    if (error instanceof Error) {
      console.log(error);
    }
    return Response.json({ message: error }, { status: 500 });
  }
}

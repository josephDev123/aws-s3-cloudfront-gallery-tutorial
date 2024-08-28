import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

export async function GET(req: Request) {
  // const query = new URL(req.url).searchParams;
  const query = new URL(req.url).searchParams.get("fileName");

  try {
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: "",
        secretAccessKey: "",
      },
    });

    const params: PutObjectCommandInput = {
      Bucket: "aws-s3-cloudfront-testing-bucket",
      Key: `testing/${query}`,
    };
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return Response.json({ message: response }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

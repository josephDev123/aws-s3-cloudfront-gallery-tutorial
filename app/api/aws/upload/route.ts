import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  // const query = new URL(req.url).searchParams.get("fileName");
  const body = await req.json();
  const fileName = body.fileName;

  try {
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const params: PutObjectCommandInput = {
      Bucket: "aws-s3-cloudfront-testing-bucket",
      Key: `testing/${fileName}`,
    };
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return Response.json({ message: response }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

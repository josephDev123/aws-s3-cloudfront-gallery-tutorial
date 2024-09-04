import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  // const query = new URL(req.url).searchParams.get("fileName");
  const formData = await req.formData();
  const file = formData.get("file");
  // const body = await req.json();
  // const fileName = body.fileName;

  try {
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ message: "No file or invalid file provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const params: PutObjectCommandInput = {
      Bucket: "aws-s3-cloudfront-testing-bucket",
      Key: `testing/${file.name}`,
      Body: buffer,
    };
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return Response.json({ message: "helo" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

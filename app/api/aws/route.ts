import { pool } from "../db";

export async function GET(req: Request) {
  console.log("from ", process.env.AWS_ACCESS_KEY);
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM gallery");
    console.log("row", rows);
    return Response.json(
      { message: "get aws file", data: rows },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return Response.json(
        { message: "db connection problem" },
        { status: 500 }
      );
    }
    return Response.json({ message: "error" }, { status: 500 });
  }
}

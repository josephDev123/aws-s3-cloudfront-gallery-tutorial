import UploadFileSection from "./components/UploadFileSection";
import Gallery from "./components/Gallery";
import { error } from "console";

export default async function Home() {
  let result: { message: string; data: any[] } = {
    message: "",
    data: [],
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL_API}/aws`
      //   {
      //   next: { revalidate: 3600 },
      // }
    );
    if (!response.ok) {
      throw error;
    }

    result = await response.json();
    console.log(result);
  } catch (error) {
    throw error;
  }

  return (
    <main className="flex min-h-screen flex-col  p-6">
      <h1 className="text-3xl font-bold my-3">AWS s3 and Cloudfront</h1>
      <UploadFileSection />
      <div className="grid grid-cols-4 gap-4">
        {result?.data.map((item: any, i) => (
          <Gallery key={i} item={item} />
        ))}
      </div>
    </main>
  );
}

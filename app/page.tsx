import Image from "next/image";
import UploadFileSection from "./(components)/UploadFileSection";
import Gallery from "./(components)/Gallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-6">
      <h1 className="text-3xl font-bold my-3">AWS s3 and Cloudfront</h1>
      <UploadFileSection />
      <Gallery />
    </main>
  );
}

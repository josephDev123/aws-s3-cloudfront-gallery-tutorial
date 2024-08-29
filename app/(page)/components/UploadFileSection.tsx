"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axiosInstances";
import { Button } from "@/components/ui/button";

export default function UploadFileSection() {
  const [fileName, setFileName] = useState<File | null>(null);
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file);
    }
  };

  const handleUploadFile = async () => {
    const response = await axiosInstance({
      url: "/aws/upload",
      method: "POST",
      data: { fileName: fileName },
    });
    const result = await response.data;
  };
  return (
    <section className="my-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" onChange={handleFileChange} />
        <Button
          onClick={handleUploadFile}
          type="button"
          className="bg-green-600"
        >
          Upload
        </Button>
      </div>
    </section>
  );
}

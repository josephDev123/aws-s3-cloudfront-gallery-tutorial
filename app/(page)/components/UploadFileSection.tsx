"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axiosInstances";
import { Button } from "@/components/ui/button";

export default function UploadFileSection() {
  const [fileName, setFileName] = useState<File>(null!);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];

    if (files) {
      // console.log(files.name);
      setFileName(files);
    }
  };

  const handleUploadFile = async () => {
    setStatus("loading");
    try {
      const formData = new FormData();

      formData.append("file", fileName);
      formData.append("title", title);
      formData.append("desc", desc);
      const response = await axiosInstance({
        url: "aws/upload",
        method: "POST",
        data: formData,
      });
      const result = await response.data;
      setStatus("success");
      console.log(response);
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };
  return (
    <section className="my-4">
      <div
        // onSubmit={handleUploadFile}
        className="grid w-full max-w-sm items-center gap-1.5"
      >
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          name="file"
          onChange={handleFileChange}
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          id=""
          className="outline-none p-2 rounded-md border"
        />
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          rows={5}
          name="description"
          id=""
          placeholder="description"
          className="rounded-md border p-2"
        ></textarea>
        <Button
          disabled={status === "loading"}
          onClick={handleUploadFile}
          type="button"
          className="bg-green-600 gap-2 inline-flex items-center"
        >
          Upload
          {status === "loading" && <span className="text-xs">Loading ...</span>}
        </Button>
      </div>
    </section>
  );
}

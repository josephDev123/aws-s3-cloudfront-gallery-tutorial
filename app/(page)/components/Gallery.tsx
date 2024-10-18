import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Gallery({ item }: { item: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.des}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <p>Card Content</p> */}
        <Image
          src={`https://d3n79iv3agr9k3.cloudfront.net/${item.filename}`}
          alt={item.filename}
          width={500}
          height={500}
        />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

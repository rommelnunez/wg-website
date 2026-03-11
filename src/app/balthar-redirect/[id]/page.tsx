import Variant1 from "@/components/redirects/Variant1";
import Variant2 from "@/components/redirects/Variant2";
import Variant3 from "@/components/redirects/Variant3";
import Variant4 from "@/components/redirects/Variant4";
import Variant5 from "@/components/redirects/Variant5";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RedirectPage({ params }: PageProps) {
  const { id } = await params;

  switch (id) {
    case "1":
      return <Variant1 />;
    case "2":
      return <Variant2 />;
    case "3":
      return <Variant3 />;
    case "4":
      return <Variant4 />;
    case "5":
      return <Variant5 />;
    default:
      notFound();
  }
}

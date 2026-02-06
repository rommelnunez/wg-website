import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "WG",
  description: "Film Distribution",
  metadataBase: new URL("https://rommelnunez.github.io/wg-website/"),
  openGraph: {
    title: "WG",
    description: "Film Distribution",
    url: "https://rommelnunez.github.io/wg-website/",
    siteName: "WG Film Distribution",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 600,
        alt: "WG Film Distribution",
      },
    ],
    type: "website",
  },
};



// ... (imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trinibuzz Tap Card",
  description:
    "Tap. Scan. Share your contact instantly with Trinibuzz NFC and QR digital business cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
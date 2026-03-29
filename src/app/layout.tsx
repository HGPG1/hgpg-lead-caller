import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HGPG Lead Caller | PropStream Lead Calling System",
  description: "PropStream Lead Calling System for Homegrown Property Group. Find leads, manage call lists, and close more deals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

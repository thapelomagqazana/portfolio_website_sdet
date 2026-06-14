import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thapelo Magqazana | SDET Portfolio",
  description:
    "Software Development Engineer in Test portfolio focused on quality engineering, test automation, and release confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { siteSeo } from "@/data/seo";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildOrganizationJsonLd,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = buildPageMetadata();

export const viewport: Viewport = {
  themeColor: siteSeo.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [buildPersonJsonLd(), buildWebsiteJsonLd(), buildOrganizationJsonLd()];

  return (
    <html lang={siteSeo.language} data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {jsonLd.map((schema) => (
          <script
            key={String(schema["@type"])}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}

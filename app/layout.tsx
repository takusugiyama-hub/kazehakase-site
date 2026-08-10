import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import UnderConstruction from "@/components/UnderConstruction";

export const metadata: Metadata = {
  title: "風博士 | Official Website",
  description: "シンガーソングライター風博士の公式サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUnderConstruction =
    process.env.SITE_UNDER_CONSTRUCTION === "true";

  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        {isUnderConstruction ? (
          <UnderConstruction />
        ) : (
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
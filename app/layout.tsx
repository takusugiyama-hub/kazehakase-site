import type { Metadata } from "next";
import Script from "next/script";
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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X4VM8ZSGW6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X4VM8ZSGW6');
          `}
        </Script>

        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"7b2cd3e21ada4e0f978110833af6cc38"}'
        />
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}

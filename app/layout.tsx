import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al-Hamidi Bakery - معجنات الحميدي",
  description: "Best bakery in Tripoli - أفضل معجنات في طرابلس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-P40VL9KNQZ`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P40VL9KNQZ');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}

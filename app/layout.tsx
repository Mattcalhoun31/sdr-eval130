import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Symmetri Growth | Voice AI Assistant",
  description: "AI-powered voice assistant that greets visitors, qualifies leads, and books sales meetings automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

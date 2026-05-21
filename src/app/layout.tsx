import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steve Beno H — ECE Student Portfolio",
  description:
    "1st Year ECE student passionate about embedded systems, web development, and building projects that bridge hardware and software.",
  keywords: [
    "Steve Beno",
    "ECE Student",
    "Electronics and Communication",
    "Embedded Systems",
    "Web Development",
    "Arduino",
    "Portfolio",
  ],
  authors: [{ name: "Steve Beno H" }],
  openGraph: {
    title: "Steve Beno H — ECE Student Portfolio",
    description:
      "1st Year ECE student passionate about embedded systems, web development, and building projects that bridge hardware and software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

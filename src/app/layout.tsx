import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070B13",
};

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${lato.variable} ${playfair.variable} ${plexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

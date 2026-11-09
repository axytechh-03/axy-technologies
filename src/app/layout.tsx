import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080d1b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AXY Technologies — Build. Market. Grow.",
  description:
    "AXY Technologies — Build. Market. Grow. Websites, digital marketing and SEO that move businesses forward.",
  keywords: [
    "AXY Technologies",
    "Web development",
    "Digital marketing",
    "SEO optimization",
    "Branding",
    "Coimbatore",
  ],
  authors: [{ name: "AXY Technologies" }],
  icons: {
    icon: "/favicon.ico",
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
      className={`${dmSans.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased selection:bg-[#3563f533] selection:text-[#3563f5]">
        {children}
      </body>
    </html>
  );
}

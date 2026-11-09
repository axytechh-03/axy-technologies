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
    "AXY Technologies — Strategic website development, targeted Meta & Google Ads, and local SEO optimization that move modern businesses forward.",
  keywords: [
    "AXY Technologies",
    "Website development",
    "Digital marketing",
    "Meta Ads",
    "Google Ads",
    "SEO optimization",
    "Branding",
    "Coimbatore",
  ],
  authors: [{ name: "AXY Technologies" }],
  creator: "AXY Technologies",
  publisher: "AXY Technologies",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://axytechnologies.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AXY Technologies — Build. Market. Grow.",
    description:
      "Strategic website development, targeted Meta & Google Ads, and local SEO optimization that move modern businesses forward.",
    url: "/",
    siteName: "AXY Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AXY Technologies — Build. Market. Grow.",
    description:
      "Strategic website development, targeted Meta & Google Ads, and local SEO optimization that move modern businesses forward.",
  },
  robots: {
    index: true,
    follow: true,
  },
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

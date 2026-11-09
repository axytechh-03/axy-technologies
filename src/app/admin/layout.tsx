import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AXY Admin — Private Management Portal",
  description: "Confidential management portal for AXY Technologies administrators.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#111827] font-sans antialiased selection:bg-[#3563f525] selection:text-[#3563f5]">
      {children}
    </div>
  );
}

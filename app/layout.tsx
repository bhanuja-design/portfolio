import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "@/app/components/ui/CustomCursor";
import { brandColors } from "@/app/lib/brand-colors";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Bhanuja Sanghavi",
    template: "%s — Bhanuja Sanghavi",
  },
  description:
    "Multi-disciplinary product designer at Amazon Web Services, focused on systems and complex experiences across design, strategy, and research.",
  openGraph: {
    title: "Bhanuja Sanghavi",
    description:
      "Multi-disciplinary product designer at Amazon Web Services, focused on systems and complex experiences.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Bhanuja Sanghavi",
    description:
      "Multi-disciplinary product designer at Amazon Web Services, focused on systems and complex experiences.",
  },
};

export const viewport: Viewport = {
  themeColor: brandColors.background,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <body className="bg-background font-sans text-text-primary antialiased">
        <CustomCursor />
        <div className="site overflow-x-clip">
          {children}
        </div>
      </body>
    </html>
  );
}

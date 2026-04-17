import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClientLayout } from "@/components/layout/ClientLayout";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: {
    template: "%s - Payfake",
    default: "Payfake Documentation",
  },
  description:
    "Self-hostable Paystack-compatible payment simulator for African developers",
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  metadataBase: new URL("https://docs.payfake.co"),
  openGraph: {
    title: "Payfake Documentation",
    description: "Self-hostable Paystack-compatible payment simulator",
    url: "https://docs.payfake.co",
    siteName: "Payfake",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payfake Documentation",
    description: "Self-hostable Paystack-compatible payment simulator",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-black text-white antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}

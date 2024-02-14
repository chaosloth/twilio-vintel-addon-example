import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twilio Voice Intelligence Demo",
  description: "Communications at scale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:url" content="https://twilio.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Twilio - The Future with Twilio!" />
        <meta
          property="og:description"
          content="Connect with customers on their preferred channels—anywhere in the world. Quickly integrate powerful communication APIs to start building solutions for SMS and WhatsApp messaging, voice, video, and email."
        />
        {/* <meta property="og:image" content="/preview.png"/> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

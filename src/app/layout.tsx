import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haven Reformer Studio & Boutique | Rooted in Faith, Community & Fun",
  description:
    "Your Haven to grow strong. Strength-based reformer workouts blending controlled movements with modern training. Rooted in faith, community, and having fun.",
  keywords: [
    "reformer pilates",
    "boutique fitness",
    "strength training",
    "haven studio",
    "pilates classes",
    "reformer workouts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#E8447A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        {children}
      </body>
    </html>
  );
}

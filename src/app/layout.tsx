import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haven Reformer Studio & Boutique | Fuquay-Varina, NC",
  description:
    "Your Haven to grow strong. Strength-based reformer workouts rooted in faith, community, and having fun. Book your class today in Fuquay-Varina, NC.",
  keywords: [
    "reformer pilates fuquay varina",
    "boutique fitness studio",
    "strength training NC",
    "haven reformer studio",
    "pilates classes near me",
    "reformer workouts",
    "shannon daly pilates",
  ],
  metadataBase: new URL("https://adiractive.vercel.app"),
  openGraph: {
    title: "Haven Reformer Studio & Boutique",
    description:
      "A boutique reformer studio created to be a place of strength, joy, and belonging. Rooted in faith, community & having fun. Book your class today.",
    url: "https://adiractive.vercel.app",
    siteName: "Haven Reformer Studio",
    images: [
      {
        url: "/vertical1.png",
        width: 1200,
        height: 630,
        alt: "Haven Reformer Studio - Your Haven to Grow Strong",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haven Reformer Studio & Boutique",
    description:
      "Strength-based reformer workouts rooted in faith, community & fun. Fuquay-Varina, NC.",
    images: ["/vertical1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://adiractive.vercel.app",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Haven Reformer Studio & Boutique",
  description:
    "A boutique reformer studio created to be a place of strength, joy, and belonging. Strength-based reformer workouts rooted in faith, community, and having fun.",
  url: "https://adiractive.vercel.app",
  telephone: "+19842059212",
  email: "hello.adir.active@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2908 N Main St, Unit 100",
    addressLocality: "Fuquay-Varina",
    addressRegion: "NC",
    postalCode: "27526",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.5963,
    longitude: -78.7996,
  },
  image: "https://adiractive.vercel.app/vertical1.png",
  priceRange: "$15 - $159.99",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "15",
    bestRating: "5",
  },
  openingHours: "Mo-Fr 05:00-20:00, Sa 08:00-12:00",
  sameAs: ["https://www.instagram.com/havenreformer"],
  founder: {
    "@type": "Person",
    name: "Shannon Daly",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Class Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Drop-In Class" },
        price: "30.00",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Intro to Haven" },
        price: "15.00",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Unlimited Membership" },
        price: "159.99",
        priceCurrency: "USD",
      },
    ],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

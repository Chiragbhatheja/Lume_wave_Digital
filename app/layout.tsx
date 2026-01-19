import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";
import CookieConsent from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: '--font-poppins'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LumeWave Digital",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  sameAs: [
    "https://www.linkedin.com/company/lumewavedigital/",
    "https://www.instagram.com/lumewavedigital?igsh=cm9icTFoNHFjZDZw",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LumeWave Digital",
  url: baseUrl,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LumeWave Digital - Digital Innovation Agency",
    template: "%s | LumeWave Digital",
  },
  description: "Integrated digital innovation – from SaaS development to cinematic stories.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "LumeWave Digital",
    title: "LumeWave Digital - Digital Innovation Agency",
    description: "Integrated digital innovation – from SaaS development to cinematic stories.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "LumeWave Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumeWave Digital - Digital Innovation Agency",
    description: "Integrated digital innovation – from SaaS development to cinematic stories.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180' }
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicon_io/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/favicon_io/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} font-inter`}>
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QHQJN9T7FC"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QHQJN9T7FC');
            `,
          }}
        />
        <Providers>
          <CustomCursor />
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <AnalyticsTracker />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

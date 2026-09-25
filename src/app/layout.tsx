import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://medionmx.com"),

  title: {
    default: "Medion MX | Insumos Médicos en México",
    template: "%s | Medion MX",
  },

  description:
    "Medion MX es una tienda especializada en la venta de insumos médicos, material clínico, equipo médico y productos para profesionales de la salud en México.",

  keywords: [
    "insumos médicos",
    "material médico",
    "equipo médico",
    "productos médicos",
    "dispositivos médicos",
    "suministros médicos",
    "material clínico",
    "equipo clínico",
    "hospitales",
    "consultorios médicos",
    "Medion MX",
    "medionmx.com",
    "venta de insumos médicos",
    "insumos médicos México",
  ],

  authors: [
    {
      name: "Medion MX",
      url: "https://medionmx.com",
    },
  ],

  creator: "Medion MX",
  publisher: "Medion MX",

  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://medionmx.com",
    siteName: "Medion MX",
    title: "Medion MX | Insumos Médicos en México",
    description:
      "Venta de insumos médicos, material clínico y equipo médico para hospitales, clínicas y profesionales de la salud.",
    images: [
      {
        url: "https://medionmx.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Medion MX",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Medion MX | Insumos Médicos",
    description:
      "Venta de insumos médicos, material clínico y equipo médico en México.",
    images: ["https://medionmx.com/logo.png"],
  },


  alternates: {
    canonical: "https://medionmx.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "medical",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
      <head>

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Gîtes en Baie | Baie de Somme",
    template: "%s | Gîtes en Baie",
  },
  description:
    "Gîtes à Saint-Valery-sur-Somme et en Baie de Somme. Hébergements de charme proches du Marquenterre, du Crotoy et du littoral. Réservez votre séjour en Baie de Somme.",
  keywords: [
    "gîte baie de somme",
    "gîte saint valery sur somme",
    "location baie de somme",
    "gîte marquenterre",
    "week-end baie de somme",
  ],
  openGraph: {
    title: "Gîtes en Baie – Séjours en Baie de Somme",
    description:
      "Découvrez nos gîtes situés à Saint-Valery-sur-Somme et au cœur de la Baie de Somme.",
    type: "website",
    locale: "fr_FR",
    // Laisse vide si tu n'as pas encore ton domaine, ou mets une valeur provisoire
    // url: "https://gites-en-baie.fr",
    siteName: "Gîtes en Baie",
    images: [
      {
        url: "/images/baie-somme.jpg",
        width: 1200,
        height: 630,
        alt: "Vue aérienne de la Baie de Somme",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="bg-[color:var(--sand)] text-[color:var(--slate)]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
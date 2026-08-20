import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%230b0b0e'/><text y='.9em' x='50%25' text-anchor='middle' font-size='62' font-family='sans-serif' font-weight='700' fill='%23ff7a1a'>J</text></svg>";

export const metadata: Metadata = {
  title: "Joel Aravena — Links",
  description: "Cursos, proyectos y redes de Joel Aravena.",
  icons: { icon: FAVICON },
  openGraph: {
    type: "website",
    title: "Joel Aravena — Links",
    description: "Cursos, proyectos y redes.",
    images: [
      "https://ik.imagekit.io/lrx068gs9l/Skauptech/Yo/IMG_5896.JPG?tr=w-1200,h-630,fo-auto",
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0b0e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

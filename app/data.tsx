import type { ReactNode } from "react";
import {
  GlobeIcon,
  GraduationIcon,
  HouseIcon,
  LinkedInIcon,
  MailIcon,
  SpaceIcon,
} from "./components/icons";

export type LinkItem = {
  title: string;
  subtitle: string;
  href: string;
  icon: ReactNode;
  featured?: boolean;
  external?: boolean;
};

export type Project = {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
};

export const courses: LinkItem[] = [
  {
    title: "Curso destacado",
    subtitle: "Programa completo, de cero a proyecto final",
    href: "https://cursos-delta.vercel.app/courses",
    icon: <GraduationIcon />,
    featured: true,
    external: true,
  },
];

export const contact: LinkItem[] = [
  {
    title: "LinkedIn",
    subtitle: "Experiencia profesional y networking",
    href: "https://www.linkedin.com/in/joelaravena",
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    title: "Email",
    subtitle: "contacto@joelaravena.com",
    href: "mailto:contacto@joelaravena.com",
    icon: <MailIcon />,
  },
];

export const projects: Project[] = [
  {
    title: "Plataforma de cursos",
    description:
      "Catálogo de cursos online con lecciones en video, inscripción y seguimiento del progreso del alumno.",
    icon: <GraduationIcon />,
    href: "https://cursos-delta.vercel.app/courses",
  },
  {
    title: "Renta corta · Experiencia inmersiva 3D",
    description:
      "Una aproximación en 3D a la experiencia inmersiva que vivirán los huéspedes en tu alojamiento de renta corta. Proyecto aún en desarrollo.",
    icon: <HouseIcon />,
    href: "https://web-casa-renta-corta-3d.vercel.app/",
  },
  {
    title: "Laguna Verde · Guía turística",
    description:
      "Una guía turística para descubrir Laguna Verde y planificar tu visita.",
    icon: <GlobeIcon />,
    href: "https://www.lagunaverde.info/",
  },
  {
    title: "¿Necesitas un código QR?",
    description:
      "Te dejo aquí un proyecto personal: un generador gratuito de códigos QR para URL, WiFi, ubicación, email, SMS y teléfono.",
    icon: <GlobeIcon />,
    href: "https://freeqrxyou.vercel.app/",
  },
  {
    title: "NASA Photo",
    description: "Galería de fotos espaciales para explorar imágenes del universo.",
    icon: <SpaceIcon />,
    href: "https://nasa-photo-mu.vercel.app/",
  },
  {
    title: "Data Recording · Demo de app móvil",
    description:
      "Demo de mi app móvil para registrar datos de los sensores del celular y visualizarlos para investigación o actividades personales.",
    icon: <GlobeIcon />,
    href: "https://app-data-recording-landing.vercel.app/",
  },
];

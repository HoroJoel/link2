import type { ReactNode } from "react";
import {
  GlobeIcon,
  GraduationIcon,
  HouseIcon,
  LinkedInIcon,
  MailIcon,
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
  },
  {
    title: "Experiencia Desconexión",
    description:
      "Sitio de arriendo de cabaña: galería, disponibilidad y reservas directas para desconectarse en la naturaleza.",
    icon: <HouseIcon />,
  },
  {
    title: "Fotos de la NASA",
    description:
      "App que consume la API pública de la NASA para explorar la imagen astronómica del día y fotos de Marte.",
    icon: <GlobeIcon />,
  },
];

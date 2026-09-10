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
  },
  {
    title: "Experiencia Desconexión",
    description:
      "¿Necesitas desconectar de la ciudad? Ven a descansar entre cerros, mar y bosques en Laguna Verde. Te invitamos a la desconexión.",
    icon: <HouseIcon />,
    href: "https://www.airbnb.cl/rooms/1369827108670997313?check_in=2026-09-25&check_out=2026-09-30&guests=1&adults=1&s=67&unique_share_id=e3d1c362-3c90-46c8-b082-c640ada49b45",
  },
  {
    title: "¿Necesitas un código QR?",
    description:
      "Te dejo aquí un proyecto personal: un generador gratuito de códigos QR para URL, WiFi, ubicación, email, SMS y teléfono.",
    icon: <GlobeIcon />,
    href: "https://freeqrxyou.vercel.app/",
  },
];

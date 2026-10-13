"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { contact, workshops, projects, type LinkItem, type Project } from "../data";
import { Arrow, BriefcaseIcon, ChevronLeftIcon } from "./icons";

type View = "home" | "work";

const HASH = "#proyectos";
const OUT_MS = 220;

function trackButtonClick(label: string) {
  track("button_click", { label });
}

function LinkCard({ item }: { item: LinkItem }) {
  return (
    <a
      className={item.featured ? "link featured" : "link"}
      href={item.href}
      onClick={() => trackButtonClick(item.title)}
      {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
    >
      <span className="ico" aria-hidden="true">
        {item.icon}
      </span>
      <span className="meta">
        <strong>{item.title}</strong>
        <span>{item.subtitle}</span>
      </span>
      <Arrow />
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <span className="project-top">
      <span className="project-ico" aria-hidden="true">
        {project.icon}
      </span>
      <span className="project-body">
        <strong>{project.title}</strong>
        <span>{project.description}</span>
      </span>
    </span>
  );
  const props = { className: "project", style: { "--i": index } as CSSProperties };

  return project.href ? (
    <a
      {...props}
      href={project.href}
      target="_blank"
      rel="noopener"
      onClick={() => trackButtonClick(project.title)}
    >
      {content}
    </a>
  ) : (
    <article {...props}>{content}</article>
  );
}

export default function Views() {
  const [view, setView] = useState<View>("home");
  const [outView, setOutView] = useState<View | null>(null);
  const [entering, setEntering] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const submitting = useRef(false);

  async function onSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const nombre = String(fields.get("name") ?? "").trim();
    if (!nombre) {
      setFormError("Escribe tu nombre para continuar.");
      setFormStatus("error");
      form.querySelector<HTMLInputElement>("#newsletter-name")?.focus();
      return;
    }
    submitting.current = true;
    setFormStatus("sending");
    setFormError("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email: String(fields.get("email") ?? "").trim(),
          consent: fields.get("emailConsent") === "accepted",
          mensaje: String(fields.get("message") ?? "").trim(),
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "No pudimos completar el envío. Inténtalo nuevamente.");
      }
      form.reset();
      setFormStatus("success");
    } catch (error) {
      setFormError(error instanceof Error && error.message && error.name === "Error"
        ? error.message
        : "No pudimos confirmar el envío. Revisa tu conexión y espera un momento antes de reintentar.");
      setFormStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  const portfolioRef = useRef<HTMLAnchorElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);
  const fromHome = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewRef = useRef<View>("home");

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const swap = useCallback((to: View) => {
    if (busy.current || viewRef.current === to) return;
    busy.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOutView(viewRef.current);

    timer.current = setTimeout(
      () => {
        setOutView(null);
        setView(to);
        viewRef.current = to;
        setEntering(true);
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        const focusEl = to === "work" ? backRef.current : portfolioRef.current;
        focusEl?.focus({ preventScroll: true });
        busy.current = false;
      },
      reduce ? 0 : OUT_MS,
    );
  }, []);

  // Estado inicial + navegación por hash
  useEffect(() => {
    if (window.location.hash === HASH) {
      setView("work");
      viewRef.current = "work";
      setEntering(true);
    }

    const onHashChange = () => {
      swap(window.location.hash === HASH ? "work" : "home");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [swap]);

  const shown = outView ?? view;
  const classFor = (v: View) => {
    if (v === outView) return "view is-out";
    if (v === view && entering) return "view is-in";
    return "view";
  };

  const onBack = () => {
    if (fromHome.current) history.back();
    else window.location.hash = "";
  };

  return (
    <>
      {/* ============ VISTA: LINKS ============ */}
      <div className={classFor("home")} id="view-home" hidden={shown !== "home"}>
        <section id="talleres" className="anim" style={{ animationDelay: ".06s" }}>
          <h2 className="section-title">Talleres</h2>
          {workshops.map((item) => (
            <LinkCard key={item.title} item={item} />
          ))}
        </section>

        <section className="anim" style={{ animationDelay: ".12s" }}>
          <h2 className="section-title">Proyectos</h2>
          <a
            ref={portfolioRef}
            className="link"
            href={HASH}
            id="btn-portfolio"
            aria-controls="view-work"
            aria-expanded={view === "work"}
            onClick={() => {
              trackButtonClick("Portfolio");
              fromHome.current = true;
            }}
          >
            <span className="ico" aria-hidden="true">
              <BriefcaseIcon />
            </span>
            <span className="meta">
              <strong>Portfolio</strong>
              <span>Trabajos seleccionados y casos de estudio</span>
            </span>
            <Arrow />
          </a>
        </section>

        <section className="anim" style={{ animationDelay: ".18s" }}>
          <h2 className="section-title">Contacto</h2>
          {contact.map((item) => (
            <LinkCard key={item.title} item={item} />
          ))}
        </section>

        <section className="anim" style={{ animationDelay: ".24s" }}>
          <h2 className="section-title">Boletín informativo</h2>
          <form className="newsletter" onSubmit={onSubscribe} aria-busy={formStatus === "sending"}>
            <p className="newsletter-help">Recibe novedades y cuéntame qué te gustaría aprender. Todos los campos son obligatorios, excepto el mensaje.</p>
            <fieldset className="newsletter-fields" disabled={formStatus === "sending"}>
            <label htmlFor="newsletter-name">Tu nombre</label>
            <input
              className="newsletter-input"
              id="newsletter-name"
              name="name"
              type="text"
              maxLength={120}
              required
              autoComplete="name"
              placeholder="Escribe tu nombre"
            />
            <label htmlFor="newsletter-email">Correo</label>
            <input
              className="newsletter-input"
              id="newsletter-email"
              name="email"
              type="email"
              maxLength={254}
              required
              autoComplete="email"
              placeholder="tu@correo.com"
            />
            <label htmlFor="newsletter-message">Mensaje (opcional)</label>
            <textarea
              className="newsletter-input newsletter-message"
              id="newsletter-message"
              name="message"
              rows={4}
              maxLength={2000}
              aria-describedby="newsletter-message-help"
              placeholder="Escribe tu mensaje"
            />
            <p className="newsletter-help" id="newsletter-message-help">Puedes escribir hasta 2000 caracteres.</p>
            <label className="newsletter-consent" htmlFor="newsletter-consent">
              <input
                id="newsletter-consent"
                name="emailConsent"
                type="checkbox"
                value="accepted"
                required
              />
              <span>Autorizo a enviarme el boletín informativo por correo electrónico.</span>
            </label>
            <button className="newsletter-button" type="submit">
              {formStatus === "sending" ? "Enviando…" : formStatus === "error" ? "Volver a intentar" : "Enviar"}
            </button>
            </fieldset>
            <div role="status" aria-live="polite" aria-atomic="true">
              {formStatus === "sending" && <p className="newsletter-help">Estamos enviando tu formulario…</p>}
              {formStatus === "success" && <p className="newsletter-feedback">¡Gracias! Recibimos tus datos correctamente.</p>}
            </div>
            {formStatus === "error" && <p className="newsletter-feedback newsletter-error" role="alert">{formError}</p>}
          </form>
        </section>
      </div>

      {/* ============ VISTA: PROYECTOS ============ */}
      <div className={classFor("work")} id="view-work" hidden={shown !== "work"}>
        <button
          ref={backRef}
          className="back"
          id="btn-back"
          type="button"
          onClick={() => {
            trackButtonClick("Volver");
            onBack();
          }}
        >
          <ChevronLeftIcon />
          Volver
        </button>

        <div className="work-panel">
          <h2 className="work-title">Proyectos principales</h2>

          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

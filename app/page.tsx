import Avatar from "./components/Avatar";
import Views from "./components/Views";

export default function Home() {
  return (
    <div className="wrap">
      {/* ============ HEADER ============ */}
      <header className="anim">
        <Avatar />

        <div>
          <h1>Joel Aravena</h1>
          <p className="role">Desarrollador &amp; Educador</p>
        </div>

        <p className="bio">
          Construyo productos web y comparto lo que aprendo. Acá están mis cursos,
          proyectos y redes.
        </p>
      </header>

      <Views />
    </div>
  );
}

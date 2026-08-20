"use client";

import { useState } from "react";

const PHOTO =
  "https://ik.imagekit.io/lrx068gs9l/Skauptech/Yo/IMG_5896.JPG?tr=w-400,h-400,fo-auto";

export default function Avatar() {
  const [failed, setFailed] = useState(false);

  return (
    <div className={failed ? "avatar no-photo" : "avatar"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PHOTO}
        alt="Foto de Joel Aravena"
        width={400}
        height={400}
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
      <div className="initials" aria-hidden="true">
        JA
      </div>
      <span className="status" title="Disponible" aria-label="Disponible" />
    </div>
  );
}

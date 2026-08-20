"use client";

import { useEffect, useState } from "react";

/** Año calculado en el cliente para que no quede congelado en el build. */
export default function Year({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span id="year">{year}</span>;
}

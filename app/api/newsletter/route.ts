export async function POST(request: Request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "El formulario no es válido." }, { status: 400 });
  }

  if (
    !data ||
    typeof data.nombre !== "string" ||
    !data.nombre.trim() ||
    data.nombre.length > 120 ||
    typeof data.email !== "string" ||
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) ||
    data.consent !== true ||
    (data.mensaje !== undefined &&
      (typeof data.mensaje !== "string" || data.mensaje.length > 2000))
  ) {
    return Response.json(
      { error: "Revisa tu nombre, correo y autorización. El mensaje puede tener hasta 2000 caracteres." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      "https://civic-latticed-recolor.ngrok-free.dev/webhook/curso-vibe-coding",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{
          nombre: data.nombre.trim(),
          email: data.email.trim(),
          consent: true,
          mensaje: data.mensaje?.trim() ?? "",
        }]),
        signal: AbortSignal.timeout(15000),
      },
    );
    if (!response.ok) {
      return Response.json(
        { error: "No pudimos completar el envío. Tus datos siguen aquí para que lo intentes nuevamente." },
        { status: 502 },
      );
    }
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "No pudimos confirmar el envío. Espera un momento antes de volver a intentarlo." },
      { status: 504 },
    );
  }
}

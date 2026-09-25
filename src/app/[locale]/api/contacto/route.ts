import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Logo principal con letras para el pie del correo
const LOGO_TEXT_URL = "https://medionmx.com/title.png";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, mensaje)" },
        { status: 400 }
      );
    }

    const safeNombre = escapeHtml(String(nombre));
    const safeEmail = escapeHtml(String(email));
    const safeMensaje = escapeHtml(String(mensaje)).replace(/\n/g, "<br>");

    const card = `
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          max-width: 680px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #f1e6ff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 18px 50px rgba(168, 85, 247, 0.10);
        "
      >
        <tr>
          <td style="height: 8px; background: #c026d3; font-size: 0; line-height: 0;">&nbsp;</td>
        </tr>

        <tr>
          <td style="padding: 28px 32px 0 32px;">
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="
                background: #faf5ff;
                border: 1px solid #e9d5ff;
                border-radius: 22px;
              "
            >
              <tr>
                <td style="padding: 24px 24px 20px 24px; text-align: center;">
                  <div
                    style="
                      display: inline-block;
                      padding: 10px 14px;
                      border-radius: 999px;
                      background: #ffffff;
                      border: 1px solid #f5d0fe;
                      color: #7e22ce;
                      font-size: 11px;
                      font-weight: 700;
                      letter-spacing: 0.18em;
                      text-transform: uppercase;
                      margin-bottom: 16px;
                    "
                  >
                    Medion MX
                  </div>

                  <h1
                    style="
                      margin: 0;
                      font-size: 24px;
                      line-height: 1.2;
                      color: #2e1065;
                      font-weight: 800;
                      letter-spacing: -0.03em;
                    "
                  >
                    Nuevo mensaje recibido
                  </h1>

                  <p
                    style="
                      margin: 10px 0 0 0;
                      font-size: 14px;
                      line-height: 1.7;
                      color: #6b4d7a;
                    "
                  >
                    Hemos recibido una nueva consulta desde el formulario web.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
    `;

    const footer = `
        <tr>
          <td style="padding: 0 32px 28px 32px;">
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="
                margin-top: 20px;
                background: #fcf7ff;
                border: 1px solid #f3e8ff;
                border-radius: 20px;
              "
            >
              <tr>
                <td style="padding: 18px 20px; text-align: center;">
                  <img
                    src="${LOGO_TEXT_URL}"
                    alt="Medion MX"
                    style="
                      width: 170px;
                      max-width: 100%;
                      height: auto;
                      display: block;
                      margin: 0 auto 12px auto;
                    "
                  />

                  <p
                    style="
                      margin: 0;
                      font-size: 11px;
                      line-height: 1.6;
                      color: #8b6f95;
                    "
                  >
                    Medion MX &copy; 2026. Todos los derechos reservados.<br>
                    Si necesitas ayuda, escribe a hello@medionmx.com
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    const htmlNegocio = `
      <!DOCTYPE html>
      <html>
        <body
          style="
            margin: 0;
            padding: 0;
            background: #fcf7ff;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="background: #fcf7ff; padding: 36px 16px;"
          >
            <tr>
              <td align="center">
                ${card}

                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    max-width: 680px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-left: 1px solid #f1e6ff;
                    border-right: 1px solid #f1e6ff;
                  "
                >
                  <tr>
                    <td style="padding: 0 32px 20px 32px;">
                      <div
                        style="
                          background: #ffffff;
                          border: 1px solid #f3e8ff;
                          border-radius: 22px;
                          overflow: hidden;
                        "
                      >
                        <div
                          style="
                            padding: 16px 18px;
                            background: #fff1f7;
                            border-bottom: 1px solid #f3e8ff;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              font-weight: 800;
                              letter-spacing: 0.14em;
                              text-transform: uppercase;
                              color: #be185d;
                            "
                          >
                            Consulta de contacto
                          </p>
                        </div>

                        <div style="padding: 20px 18px;">
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                style="
                                  padding: 10px 0;
                                  width: 26%;
                                  font-size: 12px;
                                  font-weight: 700;
                                  color: #8b6f95;
                                "
                              >
                                Nombre
                              </td>
                              <td
                                style="
                                  padding: 10px 0;
                                  font-size: 14px;
                                  color: #2e1065;
                                  font-weight: 600;
                                "
                              >
                                ${safeNombre}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="
                                  padding: 10px 0;
                                  width: 26%;
                                  font-size: 12px;
                                  font-weight: 700;
                                  color: #8b6f95;
                                  border-top: 1px solid #f3e8ff;
                                "
                              >
                                Email
                              </td>
                              <td
                                style="
                                  padding: 10px 0;
                                  font-size: 14px;
                                  color: #7e22ce;
                                  font-weight: 600;
                                  border-top: 1px solid #f3e8ff;
                                "
                              >
                                <a
                                  href="mailto:${safeEmail}"
                                  style="color: #7e22ce; text-decoration: none;"
                                >
                                  ${safeEmail}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 0 32px 28px 32px;">
                      <div
                        style="
                          background: #fcf7ff;
                          border: 1px solid #e9d5ff;
                          border-radius: 22px;
                          overflow: hidden;
                        "
                      >
                        <div
                          style="
                            padding: 16px 18px;
                            background: #faf5ff;
                            border-bottom: 1px solid #e9d5ff;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              font-weight: 800;
                              letter-spacing: 0.14em;
                              text-transform: uppercase;
                              color: #7e22ce;
                            "
                          >
                            Mensaje
                          </p>
                        </div>

                        <div style="padding: 18px;">
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              line-height: 1.8;
                              color: #3b2b4d;
                              white-space: normal;
                            "
                          >
                            ${safeMensaje}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                ${footer}
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const htmlUsuario = `
      <!DOCTYPE html>
      <html>
        <body
          style="
            margin: 0;
            padding: 0;
            background: #fcf7ff;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="background: #fcf7ff; padding: 36px 16px;"
          >
            <tr>
              <td align="center">
                ${card}

                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    max-width: 680px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-left: 1px solid #f1e6ff;
                    border-right: 1px solid #f1e6ff;
                  "
                >
                  <tr>
                    <td style="padding: 0 32px 20px 32px;">
                      <div
                        style="
                          background: linear-gradient(180deg, #ffffff 0%, #fff7fb 100%);
                          border: 1px solid #f3e8ff;
                          border-radius: 22px;
                          padding: 28px 24px;
                          text-align: center;
                        "
                      >
                        <div
                          style="
                            width: 56px;
                            height: 56px;
                            border-radius: 16px;
                            background: #faf5ff;
                            border: 1px solid #e9d5ff;
                            display: inline-block;
                            line-height: 56px;
                            margin-bottom: 18px;
                          "
                        >
                          <span
                            style="
                              font-size: 28px;
                              color: #7e22ce;
                              font-weight: 700;
                            "
                          >
                            ✓
                          </span>
                        </div>

                        <h2
                          style="
                            margin: 0 0 10px 0;
                            font-size: 24px;
                            line-height: 1.2;
                            color: #2e1065;
                            font-weight: 800;
                            letter-spacing: -0.03em;
                          "
                        >
                          ¡Hola, ${safeNombre}!
                        </h2>

                        <p
                          style="
                            margin: 0 auto;
                            max-width: 500px;
                            font-size: 15px;
                            line-height: 1.8;
                            color: #4b3a42;
                          "
                        >
                          Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará para darte una respuesta lo antes posible.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 0 32px 28px 32px;">
                      <div
                        style="
                          background: #fcf7ff;
                          border: 1px solid #e9d5ff;
                          border-radius: 22px;
                          overflow: hidden;
                        "
                      >
                        <div
                          style="
                            padding: 16px 18px;
                            background: #faf5ff;
                            border-bottom: 1px solid #e9d5ff;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              font-weight: 800;
                              letter-spacing: 0.14em;
                              text-transform: uppercase;
                              color: #7e22ce;
                            "
                          >
                            Copia de tu mensaje
                          </p>
                        </div>

                        <div style="padding: 18px;">
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              line-height: 1.8;
                              color: #3b2b4d;
                              font-style: italic;
                              white-space: normal;
                            "
                          >
                            ${safeMensaje}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                ${footer}
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    await Promise.all([
      resend.emails.send({
        from: "Medion MX <hello@medionmx.com>",
        to: ["hello@medionmx.com"],
        replyTo: email,
        subject: `Nuevo Mensaje Web: ${nombre}`,
        html: htmlNegocio,
      }),
      resend.emails.send({
        from: "Medion MX <hello@medionmx.com>",
        to: [email],
        subject: "Hemos recibido tu mensaje - Medion MX",
        html: htmlUsuario,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error enviando los correos:", error);

    return NextResponse.json(
      { error: error?.message || "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
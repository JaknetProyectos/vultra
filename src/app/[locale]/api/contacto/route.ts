import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Configuración de variables globales
const BRAND_NAME = "Vultra";
const BRAND_URL = "https://vultra.com.mx";
const BRAND_LOGO = "https://vexora.com.mx/title.png";
const BRAND_BANNER = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const SUPPORT_EMAIL = "atencion@mark-vera.com";
const SENDER_EMAIL = `${BRAND_NAME} <${SUPPORT_EMAIL}>`;
const PRIMARY_COLOR = "#7052ff";
const BG_GRADIENT_START = "#7052ff";
const BG_GRADIENT_END = "#613be7";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessage(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function shell(content: string, footerContent: string) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>${BRAND_NAME}</title>
      </head>
      <body
        style="
          margin:0;
          padding:0;
          background-color:${BG_GRADIENT_START};
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          color:#334155;
        "
      >
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="
            background: linear-gradient(135deg, ${BG_GRADIENT_START} 0%, ${BG_GRADIENT_END} 100%);
            padding: 40px 16px;
          "
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  max-width: 600px;
                  width: 100%;
                  border-collapse: separate;
                  border-spacing: 0;
                "
              >
                <!-- Logo -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <a href="${BRAND_URL}" style="text-decoration:none;">
                      <img
                        src="${BRAND_LOGO}"
                        alt="${BRAND_NAME}"
                        style="display: block; max-width: 160px; height: auto; border: 0;"
                      />
                    </a>
                  </td>
                </tr>

                <!-- Tarjeta Blanca Central -->
                <tr>
                  <td
                    style="
                      background: #ffffff;
                      border-radius: 16px;
                      overflow: hidden;
                      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    "
                  >
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      ${content}
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                ${footerContent}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function heroBlock(pretitle: string, title: string, subtitle: string) {
  return `
    <!-- Banner Image -->
    <tr>
      <td style="padding: 0; line-height: 0;">
        <img
          src="${BRAND_BANNER}"
          alt="Banner ${BRAND_NAME}"
          style="width: 100%; height: auto; display: block; border: 0;"
        />
      </td>
    </tr>
    <!-- Títulos -->
    <tr>
      <td style="padding: 32px 32px 16px 32px;">
        <p
          style="
            margin: 0 0 8px 0;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: ${PRIMARY_COLOR};
          "
        >
          ${escapeHtml(pretitle)}
        </p>
        <h1
          style="
            margin: 0 0 12px 0;
            font-size: 26px;
            font-weight: 900;
            line-height: 1.2;
            color: #0f172a;
          "
        >
          ${escapeHtml(title)}
        </h1>
        <p
          style="
            margin: 0;
            font-size: 15px;
            line-height: 1.6;
            color: #64748b;
          "
        >
          ${escapeHtml(subtitle)}
        </p>
      </td>
    </tr>
  `;
}

function sectionStart() {
  return `
    <tr>
      <td style="padding: 0 32px 32px 32px;">
  `;
}

function sectionEnd() {
  return `
      </td>
    </tr>
  `;
}

function footerBlock(tagline: string, rights: string) {
  return `
    <tr>
      <td style="padding: 32px 16px 0 16px; text-align: center;">
        <p
          style="
            margin: 0;
            font-size: 13px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
          "
        >
          ${escapeHtml(tagline)}
        </p>
        <p
          style="
            margin: 8px 0 0 0;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
          "
        >
          ${escapeHtml(rights)}
        </p>
      </td>
    </tr>
  `;
}

function infoGrid(items: { label: string; value: string; href?: string }[]) {
  const cells = items
    .map(
      (item) => `
      <td valign="top" style="padding: 0 16px 16px 0; min-width: 150px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
          <p
            style="
              margin: 0 0 4px 0;
              font-size: 11px;
              line-height: 1;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              font-weight: 700;
              color: #64748b;
            "
          >
            ${escapeHtml(item.label)}
          </p>
          ${
            item.href
              ? `<a href="${escapeHtml(item.href)}" style="font-size: 15px; line-height: 1.4; color: #0f172a; text-decoration: none; font-weight: 600; display: block; word-break: break-all;">${escapeHtml(item.value)}</a>`
              : `<p style="margin: 0; font-size: 15px; line-height: 1.4; color: #0f172a; font-weight: 600; word-break: break-all;">${escapeHtml(item.value)}</p>`
          }
        </div>
      </td>
    `
    )
    .join("");

  return `
    <table
      role="presentation"
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="margin-top: 24px;"
    >
      <tr>
        ${cells}
      </tr>
    </table>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { locale, nombre, email, mensaje } = body;

    const t = await getTranslations({ locale, namespace: "Emails.contactEmail" });

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, mensaje)" },
        { status: 400 }
      );
    }

    const rawNombre = String(nombre).trim();
    const rawEmail = String(email).trim();
    const rawMensaje = String(mensaje).trim();

    const safeNombre = escapeHtml(rawNombre);
    const safeMessage = formatMessage(rawMensaje);

    const footerContent = footerBlock(
      t("footerTagline", { brandName: BRAND_NAME }),
      t("footerRights", { year: new Date().getFullYear(), brandName: BRAND_NAME })
    );

    const internalHtml = shell(
      `
      ${heroBlock(
        t("internalHeroPretitle"),
        t("internalHeroTitle"),
        t("internalHeroSubtitle")
      )}

      ${sectionStart()}
        ${infoGrid([
          { label: t("labelName"), value: rawNombre },
          { label: t("labelEmail"), value: rawEmail, href: `mailto:${rawEmail}` },
        ])}

        <div
          style="
            margin-top: 16px;
            padding: 20px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
          "
        >
          <p
            style="
              margin: 0 0 12px 0;
              font-size: 12px;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              font-weight: 700;
              color: ${PRIMARY_COLOR};
            "
          >
            ${escapeHtml(t("clientMessageTitle"))}
          </p>
          <p
            style="
              margin: 0;
              font-size: 15px;
              line-height: 1.7;
              color: #334155;
            "
          >
            ${safeMessage}
          </p>
        </div>

        <div
          style="
            margin-top: 24px;
            padding: 16px;
            background: rgba(112, 82, 255, 0.05);
            border-left: 4px solid ${PRIMARY_COLOR};
            border-radius: 4px;
            color: #475569;
            font-size: 13px;
            line-height: 1.6;
          "
        >
          ${escapeHtml(t("internalFollowUpNotice", { email: rawEmail }))}
        </div>
      ${sectionEnd()}
    `,
      footerContent
    );

    const userHtml = shell(
      `
      ${heroBlock(
        t("userHeroPretitle"),
        t("userHeroTitle"),
        t("userHeroSubtitle")
      )}

      ${sectionStart()}
        <p
          style="
            margin: 0 0 24px 0;
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
          "
        >
          ${escapeHtml(t("userGreeting", { name: safeNombre }))}
          <br /><br />
          ${escapeHtml(t("userBodyText"))}
        </p>

        ${infoGrid([
          { label: t("labelRegisteredEmail"), value: rawEmail, href: `mailto:${rawEmail}` },
          { label: t("labelSite"), value: BRAND_NAME, href: BRAND_URL },
        ])}

        <div
          style="
            margin-top: 24px;
            text-align: center;
          "
        >
          <a
            href="${BRAND_URL}"
            style="
              display: inline-block;
              padding: 14px 28px;
              background-color: ${PRIMARY_COLOR};
              color: #ffffff;
              text-decoration: none;
              font-size: 15px;
              font-weight: 600;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(112, 82, 255, 0.3);
            "
          >
            ${escapeHtml(t("buttonBackToSite"))}
          </a>
        </div>
      ${sectionEnd()}
    `,
      footerContent
    );

    await Promise.all([
      resend.emails.send({
        from: SENDER_EMAIL,
        to: [SUPPORT_EMAIL],
        subject: t("internalSubject", { name: rawNombre }),
        html: internalHtml,
      }),
      resend.emails.send({
        from: SENDER_EMAIL,
        to: [rawEmail],
        subject: t("userSubject", { brandName: BRAND_NAME }),
        html: userHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error al procesar el envío de correos:", error);

    return NextResponse.json(
      {
        error: error?.message || "Error al procesar la solicitud",
      },
      { status: 500 }
    );
  }
}
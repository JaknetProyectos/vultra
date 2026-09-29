import { formatPrice } from "@/lib/price";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Configuración de variables globales
const BRAND_NAME = "Vultra";
const BRAND_URL = "https://vultra.com.mx";
const BRAND_LOGO = "https://vultra.com.mx/title.png";
const BRAND_BANNER = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const SUPPORT_EMAIL = "atencion@mark-vera.com";
const SENDER_EMAIL = `${BRAND_NAME} <${SUPPORT_EMAIL}>`;
const PRIMARY_COLOR = "#7052ff";
const BG_GRADIENT_START = "#7052ff";
const BG_GRADIENT_END = "#613be7";

export interface EmailItem {
  id: string;
  price: number;
  quantity: number;
  title?: string;
  image?: string;
  description?: string;
}

export interface ConfirmRequestBody {
  locale?: string;
  orderId: string;
  amount: number;
  items: EmailItem[];
  customer: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    estado: string;
    cp: string;
  };
  notes?: string;
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(content: string, footerText: { support: string; rights: string }) {
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
                ${footerBlock(footerText)}
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

function footerBlock(footerText: { support: string; rights: string }) {
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
          ${escapeHtml(footerText.support)} <a href="mailto:${SUPPORT_EMAIL}" style="color: #ffffff; font-weight: bold;">${SUPPORT_EMAIL}</a>
        </p>
        <p
          style="
            margin: 8px 0 0 0;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
          "
        >
          © ${new Date().getFullYear()} · ${BRAND_NAME}. ${escapeHtml(footerText.rights)}
        </p>
      </td>
    </tr>
  `;
}

function infoGrid(items: { label: string; value: string; href?: string }[]) {
  const cells = items
    .map(
      (item) => `
      <td valign="top" style="padding: 0 16px 16px 0; min-width: 150px; width: 50%;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; height: 100%;">
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
          ${item.href
          ? `<a href="${escapeHtml(item.href)}" style="font-size: 14px; line-height: 1.4; color: #0f172a; text-decoration: none; font-weight: 600; display: block; word-break: break-word;">${escapeHtml(item.value)}</a>`
          : `<p style="margin: 0; font-size: 14px; line-height: 1.4; color: #0f172a; font-weight: 600; word-break: break-word;">${escapeHtml(item.value)}</p>`
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
      style="margin-top: 16px;"
    >
      <tr>
        ${cells}
      </tr>
    </table>
  `;
}

function itemsTable(
  items: EmailItem[],
  total: number,
  labels: { concept: string; quantity: string; total: string; totalPaid: string; currencyFormat: string }
) {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a;">${escapeHtml(item.title || item.id)}</p>
          ${item.description ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">${escapeHtml(item.description)}</p>` : ""}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 14px; color: #475569;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 14px; font-weight: 600; color: #0f172a;">
          ${escapeHtml(labels.currencyFormat.replace("{price}", formatPrice(item.price * item.quantity)))}
        </td>
      </tr>`
    )
    .join("");

  return `
    <div style="margin-top: 24px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff;">
        <thead>
          <tr>
            <th style="padding: 12px 16px; background: #f8fafc; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0;">${escapeHtml(labels.concept)}</th>
            <th style="padding: 12px 16px; background: #f8fafc; text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0;">${escapeHtml(labels.quantity)}</th>
            <th style="padding: 12px 16px; background: #f8fafc; text-align: right; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0;">${escapeHtml(labels.total)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" style="padding: 0 16px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                ${rows}
              </table>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 16px; background: #f8fafc; text-align: right; font-size: 16px; font-weight: 800; color: #0f172a; border-top: 1px solid #e2e8f0;">
              ${escapeHtml(labels.totalPaid.replace("{amount}", formatPrice(total)))}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: ConfirmRequestBody = await req.json();
    const locale = body.locale || "es";
    const t = await getTranslations({ locale, namespace: "Emails.checkoutEmail" });

    if (!body.orderId || !body.customer?.email || !body.items) {
      return NextResponse.json(
        { success: false, error: t("customerError") },
        { status: 400 }
      );
    }

    const { orderId, amount, items, customer, notes } = body;
    const clientName = `${customer.nombre} ${customer.apellido}`.trim();
    const clientAddress = `${customer.direccion}, ${customer.ciudad}, ${customer.estado}, CP ${customer.cp}`;

    const footerText = {
      support: t("footerSupport"),
      rights: t("footerRights"),
    };

    const tableLabels = {
      concept: t("tableConcept"),
      quantity: t("tableQuantity"),
      total: t("tableTotal"),
      totalPaid: t("tableTotalPaid", { amount: formatPrice(amount) }),
      currencyFormat: t("currencyFormat", { price: "{price}" }),
    };

    const customerHTML = shell(`
      ${heroBlock(
      t("customerHeroPretitle"),
      t("customerHeroTitle"),
      t("customerHeroSubtitle", { name: customer.nombre })
    )}

      ${sectionStart()}
        ${infoGrid([
      { label: t("labelOrderNumber"), value: `#${orderId}` },
      { label: t("labelDate"), value: new Date().toLocaleDateString(locale === "en" ? "en-US" : "es-MX", { year: 'numeric', month: 'long', day: 'numeric' }) },
    ])}
        
        ${infoGrid([
      { label: t("labelShippingAddress"), value: clientAddress },
    ])}

        ${itemsTable(items, amount, tableLabels)}

        <div style="margin-top: 32px; text-align: center;">
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
            ${escapeHtml(t("buttonBackToStore"))}
          </a>
        </div>
      ${sectionEnd()}
    `, footerText);

    const businessHTML = shell(`
      ${heroBlock(
      t("businessHeroPretitle"),
      t("businessHeroTitle"),
      t("businessHeroSubtitle")
    )}

      ${sectionStart()}
        ${infoGrid([
      { label: t("labelCustomer"), value: clientName },
      { label: t("labelEmail"), value: customer.email, href: `mailto:${customer.email}` },
    ])}
        
        ${infoGrid([
      { label: t("labelPhone"), value: customer.telefono },
      { label: t("labelOrder"), value: `#${orderId}` },
    ])}

        <div style="margin-top: 16px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
          <p style="margin: 0 0 8px 0; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: ${PRIMARY_COLOR};">
            ${escapeHtml(t("labelCustomerAddress"))}
          </p>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #334155;">
            ${escapeHtml(clientAddress)}
          </p>
          
          ${notes ? `
            <p style="margin: 16px 0 8px 0; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: ${PRIMARY_COLOR};">
              ${escapeHtml(t("labelAdditionalNotes"))}
            </p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #334155;">
              ${escapeHtml(notes)}
            </p>
          ` : ""}
        </div>

        ${itemsTable(items, amount, tableLabels)}
      ${sectionEnd()}
    `, footerText);

    await Promise.all([
      resend.emails.send({
        from: SENDER_EMAIL,
        to: [customer.email],
        subject: t("customerSubject", { orderId }),
        html: customerHTML,
      }),
      resend.emails.send({
        from: SENDER_EMAIL,
        to: [SUPPORT_EMAIL],
        subject: t("businessSubject", { orderId }),
        html: businessHTML,
      }),
    ]);

    return NextResponse.json({ success: true, message: t("successMessage") });
  } catch (error: any) {
    console.error("Error enviando correos en /api/confirm:", error);
    return NextResponse.json(
      { success: false, error: "El pago fue exitoso pero falló el envío del correo de confirmación." },
      { status: 500 }
    );
  }
}
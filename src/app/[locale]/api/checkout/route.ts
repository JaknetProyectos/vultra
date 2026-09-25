import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_TEXT_URL = "https://medionmx.com/title.png";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      orderId,
      amount,
      customer,
      items,
      metadata,
    } = body;

    if (
      !orderId ||
      !amount ||
      !customer ||
      !items ||
      !items.length
    ) {
      return NextResponse.json(
        {
          error:
            "Información de orden incompleta para facturación por email.",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | TABLA DE PRODUCTOS
    |--------------------------------------------------------------------------
    */

    let itemsTableRows = "";

    items.forEach((item: any) => {
      const productTotal =
        item.product.price * item.quantity;

      itemsTableRows += `
        <tr>
          <td
            style="
              padding: 18px 0;
              border-bottom: 1px solid #f3e8ff;
            "
          >
            <div
              style="
                font-size: 14px;
                font-weight: 700;
                color: #2e1065;
                margin-bottom: 4px;
              "
            >
              ${escapeHtml(item.product.name)}
            </div>

            <div
              style="
                font-size: 12px;
                color: #8b6f95;
              "
            >
              Precio unitario:
              ${formatCurrency(item.product.price)}
            </div>
          </td>

          <td
            align="center"
            style="
              padding: 18px 0;
              border-bottom: 1px solid #f3e8ff;
              font-size: 14px;
              font-weight: 700;
              color: #4b3a42;
            "
          >
            ${item.quantity}
          </td>

          <td
            align="right"
            style="
              padding: 18px 0;
              border-bottom: 1px solid #f3e8ff;
              font-size: 14px;
              font-weight: 800;
              color: #c026d3;
            "
          >
            ${formatCurrency(productTotal)}
          </td>
        </tr>
      `;
    });

    /*
    |--------------------------------------------------------------------------
    | HEADER BASE
    |--------------------------------------------------------------------------
    */

    const emailHeader = `
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          max-width: 700px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid #f1e6ff;
          box-shadow: 0 18px 50px rgba(168, 85, 247, 0.10);
        "
      >
        <tr>
          <td
            style="
              height: 8px;
              background: linear-gradient(90deg,#ec4899 0%,#c026d3 100%);
              font-size: 0;
              line-height: 0;
            "
          >
            &nbsp;
          </td>
        </tr>

        <tr>
          <td style="padding: 28px 32px 0 32px;">
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="
                background: linear-gradient(180deg,#faf5ff 0%,#fff7fb 100%);
                border: 1px solid #f3e8ff;
                border-radius: 24px;
              "
            >
              <tr>
                <td
                  style="
                    padding: 30px 24px;
                    text-align: center;
                  "
                >
                  <div
                    style="
                      display: inline-block;
                      padding: 10px 16px;
                      border-radius: 999px;
                      background: #ffffff;
                      border: 1px solid #f5d0fe;
                      color: #a21caf;
                      font-size: 11px;
                      font-weight: 800;
                      letter-spacing: 0.18em;
                      text-transform: uppercase;
                      margin-bottom: 18px;
                    "
                  >
                    Orden Confirmada
                  </div>

                  <h1
                    style="
                      margin: 0;
                      font-size: 30px;
                      line-height: 1.15;
                      font-weight: 900;
                      letter-spacing: -0.04em;
                      color: #2e1065;
                    "
                  >
                    Confirmación de Compra
                  </h1>

                  <p
                    style="
                      margin: 14px auto 0 auto;
                      max-width: 520px;
                      font-size: 14px;
                      line-height: 1.8;
                      color: #6b4d7a;
                    "
                  >
                    Tu orden fue procesada correctamente a través de nuestros canales seguros.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
    `;

    /*
    |--------------------------------------------------------------------------
    | FOOTER
    |--------------------------------------------------------------------------
    */

    const emailFooter = `
        <tr>
          <td style="padding: 0 32px 30px 32px;">
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="
                margin-top: 18px;
                background: #fcf7ff;
                border: 1px solid #f3e8ff;
                border-radius: 22px;
              "
            >
              <tr>
                <td
                  style="
                    padding: 22px;
                    text-align: center;
                  "
                >
                  <img
                    src="${LOGO_TEXT_URL}"
                    alt="Medion MX"
                    style="
                      width: 170px;
                      max-width: 100%;
                      height: auto;
                      display: block;
                      margin: 0 auto 14px auto;
                    "
                  />

                  <p
                    style="
                      margin: 0;
                      font-size: 11px;
                      line-height: 1.7;
                      color: #8b6f95;
                    "
                  >
                    Medion MX &copy; 2026. Todos los derechos reservados.<br>
                    Ubicación logística Polanco, Miguel Hidalgo, CDMX.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    /*
    |--------------------------------------------------------------------------
    | EMAIL CLIENTE
    |--------------------------------------------------------------------------
    */

    const htmlCliente = `
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
            style="
              background: #fcf7ff;
              padding: 36px 16px;
            "
          >
            <tr>
              <td align="center">

                ${emailHeader}

                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    max-width: 700px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-left: 1px solid #f1e6ff;
                    border-right: 1px solid #f1e6ff;
                  "
                >
                  <tr>
                    <td style="padding: 0 32px 22px 32px;">

                      <div
                        style="
                          background: #ffffff;
                          border: 1px solid #f3e8ff;
                          border-radius: 24px;
                          padding: 28px;
                        "
                      >
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            gap: 20px;
                            flex-wrap: wrap;
                            margin-bottom: 22px;
                          "
                        >
                          <div>
                            <p
                              style="
                                margin: 0 0 6px 0;
                                font-size: 11px;
                                font-weight: 800;
                                text-transform: uppercase;
                                letter-spacing: 0.14em;
                                color: #8b6f95;
                              "
                            >
                              Cliente
                            </p>

                            <h2
                              style="
                                margin: 0;
                                font-size: 24px;
                                color: #2e1065;
                                font-weight: 900;
                              "
                            >
                              ${escapeHtml(customer.nombre)}
                            </h2>
                          </div>

                          <div
                            style="
                              background: #faf5ff;
                              border: 1px solid #e9d5ff;
                              border-radius: 18px;
                              padding: 14px 18px;
                              min-width: 180px;
                            "
                          >
                            <p
                              style="
                                margin: 0 0 4px 0;
                                font-size: 11px;
                                text-transform: uppercase;
                                letter-spacing: 0.14em;
                                color: #8b6f95;
                                font-weight: 700;
                              "
                            >
                              Orden
                            </p>

                            <p
                              style="
                                margin: 0;
                                font-size: 18px;
                                font-weight: 900;
                                color: #c026d3;
                              "
                            >
                              #${escapeHtml(orderId)}
                            </p>
                          </div>
                        </div>

                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.8;
                            color: #4b3a42;
                          "
                        >
                          Tu compra ya fue validada y enviada al área de preparación y distribución.
                        </p>
                      </div>

                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 0 32px 24px 32px;">

                      <div
                        style="
                          background: #fcf7ff;
                          border: 1px solid #e9d5ff;
                          border-radius: 24px;
                          overflow: hidden;
                        "
                      >
                        <div
                          style="
                            padding: 18px 22px;
                            background: #faf5ff;
                            border-bottom: 1px solid #e9d5ff;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              font-weight: 800;
                              text-transform: uppercase;
                              letter-spacing: 0.14em;
                              color: #7e22ce;
                            "
                          >
                            Productos adquiridos
                          </p>
                        </div>

                        <div style="padding: 0 22px;">
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <thead>
                              <tr>
                                <th
                                  align="left"
                                  style="
                                    padding: 18px 0 10px 0;
                                    font-size: 11px;
                                    text-transform: uppercase;
                                    color: #9b87a5;
                                  "
                                >
                                  Producto
                                </th>

                                <th
                                  align="center"
                                  style="
                                    padding: 18px 0 10px 0;
                                    width: 70px;
                                    font-size: 11px;
                                    text-transform: uppercase;
                                    color: #9b87a5;
                                  "
                                >
                                  Cant.
                                </th>

                                <th
                                  align="right"
                                  style="
                                    padding: 18px 0 10px 0;
                                    width: 120px;
                                    font-size: 11px;
                                    text-transform: uppercase;
                                    color: #9b87a5;
                                  "
                                >
                                  Subtotal
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              ${itemsTableRows}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 0 32px 24px 32px;">
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                        style="
                          background: linear-gradient(135deg,#ffffff 0%,#fff7fb 100%);
                          border: 1px solid #f3d4ff;
                          border-radius: 24px;
                        "
                      >
                        <tr>
                          <td style="padding: 24px;">
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tr>
                                <td>
                                  <p
                                    style="
                                      margin: 0 0 6px 0;
                                      font-size: 11px;
                                      text-transform: uppercase;
                                      letter-spacing: 0.14em;
                                      color: #8b6f95;
                                      font-weight: 700;
                                    "
                                  >
                                    Total liquidado
                                  </p>

                                  <p
                                    style="
                                      margin: 0;
                                      font-size: 34px;
                                      font-weight: 900;
                                      color: #c026d3;
                                      letter-spacing: -0.03em;
                                    "
                                  >
                                    ${formatCurrency(amount)}
                                  </p>
                                </td>

                                <td align="right">
                                  <div
                                    style="
                                      display: inline-block;
                                      background: #faf5ff;
                                      border: 1px solid #e9d5ff;
                                      border-radius: 18px;
                                      padding: 14px 16px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 12px;
                                        color: #7e22ce;
                                        font-weight: 700;
                                      "
                                    >
                                      Pago confirmado
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 0 32px 28px 32px;">
                      <div
                        style="
                          background: #fff7ed;
                          border: 1px solid #fed7aa;
                          border-radius: 24px;
                          padding: 24px;
                        "
                      >
                        <p
                          style="
                            margin: 0 0 10px 0;
                            font-size: 12px;
                            font-weight: 800;
                            text-transform: uppercase;
                            letter-spacing: 0.14em;
                            color: #9a3412;
                          "
                        >
                          Dirección de entrega
                        </p>

                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.8;
                            color: #7c2d12;
                          "
                        >
                          ${escapeHtml(customer.direccion)}
                          ${
                            customer.direccion2
                              ? `, ${escapeHtml(customer.direccion2)}`
                              : ""
                          }
                          <br>
                          ${escapeHtml(customer.ciudad)},
                          ${escapeHtml(customer.estado)},
                          C.P. ${escapeHtml(customer.cp)}
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>

                ${emailFooter}

              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    /*
    |--------------------------------------------------------------------------
    | EMAIL NEGOCIO
    |--------------------------------------------------------------------------
    */

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
            style="
              background: #fcf7ff;
              padding: 36px 16px;
            "
          >
            <tr>
              <td align="center">

                ${emailHeader}

                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    max-width: 700px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-left: 1px solid #f1e6ff;
                    border-right: 1px solid #f1e6ff;
                  "
                >
                  <tr>
                    <td style="padding: 0 32px 22px 32px;">

                      <div
                        style="
                          background: linear-gradient(135deg,#faf5ff 0%,#fff1f7 100%);
                          border: 1px solid #f3d4ff;
                          border-radius: 24px;
                          padding: 26px;
                        "
                      >
                        <div
                          style="
                            display: inline-block;
                            background: #c026d3;
                            color: white;
                            padding: 8px 14px;
                            border-radius: 999px;
                            font-size: 11px;
                            font-weight: 800;
                            letter-spacing: 0.12em;
                            text-transform: uppercase;
                            margin-bottom: 18px;
                          "
                        >
                          Venta Ecommerce
                        </div>

                        <h2
                          style="
                            margin: 0 0 10px 0;
                            font-size: 32px;
                            line-height: 1.1;
                            font-weight: 900;
                            color: #2e1065;
                          "
                        >
                          ${formatCurrency(amount)}
                        </h2>

                        <p
                          style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.7;
                            color: #5b4768;
                          "
                        >
                          Orden procesada correctamente y lista para surtido.
                        </p>
                      </div>

                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 0 32px 24px 32px;">
                      <div
                        style="
                          background: #ffffff;
                          border: 1px solid #f3e8ff;
                          border-radius: 24px;
                          overflow: hidden;
                        "
                      >
                        <div
                          style="
                            padding: 18px 22px;
                            background: #faf5ff;
                            border-bottom: 1px solid #f3e8ff;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              font-weight: 800;
                              text-transform: uppercase;
                              letter-spacing: 0.14em;
                              color: #7e22ce;
                            "
                          >
                            Datos del cliente
                          </p>
                        </div>

                        <div style="padding: 22px;">
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              line-height: 2;
                              color: #4b3a42;
                            "
                          >
                            <strong>Nombre:</strong>
                            ${escapeHtml(customer.nombre)}
                            ${escapeHtml(customer.apellido)}
                            <br>

                            <strong>Email:</strong>
                            ${escapeHtml(customer.email)}
                            <br>

                            <strong>Teléfono:</strong>
                            ${escapeHtml(customer.telefono)}
                            <br>

                            <strong>Notas internas:</strong>
                            ${
                              metadata?.notes
                                ? escapeHtml(metadata.notes)
                                : "Ninguna"
                            }
                          </p>
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
                          border-radius: 24px;
                          overflow: hidden;
                        "
                      >
                        <div
                          style="
                            padding: 18px 22px;
                            background: #faf5ff;
                            border-bottom: 1px solid #e9d5ff;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              font-weight: 800;
                              text-transform: uppercase;
                              letter-spacing: 0.14em;
                              color: #7e22ce;
                            "
                          >
                            Artículos a surtir
                          </p>
                        </div>

                        <div style="padding: 0 22px;">
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              ${itemsTableRows}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                ${emailFooter}

              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    /*
    |--------------------------------------------------------------------------
    | ENVÍO
    |--------------------------------------------------------------------------
    */

    await Promise.all([
      resend.emails.send({
        from: "Medion MX <hello@medionmx.com>",
        to: [customer.email],
        subject: `Confirmación de Compra Orden #${orderId} - Medion MX`,
        html: htmlCliente,
      }),

      resend.emails.send({
        from: "Medion MX <hello@medionmx.com>",
        to: ["hello@medionmx.com>"],
        replyTo: customer.email,
        subject: `NOTIFICACIÓN DE VENTA: Orden #${orderId}`,
        html: htmlNegocio,
      }),
    ]);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error(
      "❌ Error enviando correos post-checkout:",
      error
    );

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
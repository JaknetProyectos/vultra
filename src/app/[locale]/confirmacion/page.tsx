'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();

  // Obtener query params
  const status = searchParams.get('status') || searchParams.get('state') || 'UNKNOWN';
  const reference = searchParams.get('reference') || searchParams.get('orderId') || 'N/A';
  const transactionId = searchParams.get('transactionId') || 'N/A';
  const amount = searchParams.get('amount');

  // Normalizar estado
  const isApproved = status.toUpperCase() === 'APPROVED' || status.toUpperCase() === 'SUCCESS';
  const isPending = status.toLowerCase() === 'pending_authentication' || status.toUpperCase() === 'PENDING';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Container Principal */}
      <main className="w-full max-w-lg">
        {/* Card Expresiva Morada (Material Design 3 / Expressive) */}
        <div className="bg-purple-900 text-purple-50 rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-purple-900/30 transition-all duration-300 relative overflow-hidden">

          {/* Elementos decorativos orgánicos en el fondo */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-600/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-800/50 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Ícono dinámico según estado */}
            <div className="mb-6 p-4 rounded-2xl bg-purple-800/60 ring-1 ring-purple-400/30 shadow-inner">
              {isApproved ? (
                // Check Icon
                <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : isPending ? (
                // Clock / Processing Icon
                <svg className="w-12 h-12 text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                // Error Icon
                <svg className="w-12 h-12 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            {/* Encabezado */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
              {isApproved
                ? '¡Pago Confirmado!'
                : isPending
                  ? 'Procesando Autenticación'
                  : 'Pago No Realizado'}
            </h1>
            <p className="text-purple-200 text-sm sm:text-base mb-8 max-w-sm">
              {isApproved
                ? 'Tu transacción se ha completado con éxito. Hemos enviado el recibo a tu correo electrónico.'
                : isPending
                  ? 'Tu pago está en proceso de verificación por parte del banco emisor.'
                  : 'Hubo un inconveniente al procesar tu pago. Por favor intenta nuevamente.'}
            </p>

            {/* Card Interna de Detalles (Superficie elevada interna) */}
            <div className="w-full bg-purple-950/60 rounded-2xl p-5 mb-8 text-left ring-1 ring-purple-500/20 backdrop-blur-sm space-y-3">
              <div className="flex justify-between items-center py-1 border-b border-purple-800/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">Estado</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${isApproved
                    ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                    : isPending
                      ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/40'
                  }`}>
                  {status}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-purple-800/50">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">Referencia</span>
                <span className="text-sm font-mono font-medium text-purple-100">{reference}</span>
              </div>

              {amount && (
                <div className="flex justify-between items-center pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">Total</span>
                  <span className="text-base font-bold text-white">${Number(amount).toFixed(2)} MXN</span>
                </div>
              )}
            </div>

            {/* Botón de Acción Principal (Material Expressive Button) */}
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-purple-950 bg-purple-200 hover:bg-white rounded-full transition-all duration-200 transform active:scale-95 shadow-lg shadow-purple-950/40 hover:shadow-purple-200/20"
            >
              Volver a la Tienda
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}

// Envuelto en Suspense por el uso de useSearchParams en Next.js App Router
export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-900 border-t-transparent" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
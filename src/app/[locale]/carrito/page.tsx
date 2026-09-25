"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { formatPrice } from "@/lib/price";
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, itemCount } = useCart();
  const t = useTranslations("cartPage");

  if (items.length === 0) {
    return (
      <div className="relative min-h-[80vh] from-violet-500  to-violet-500 overflow-hidden bg-gradient-to-br  px-4 py-20 flex items-center justify-center">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />

        {/* Glass Empty Card */}
        <div className="relative z-10 max-w-md w-full  mt-16 rounded-[2.5rem] border border-white/80 bg-white/70 p-10 text-center shadow-2xl shadow-purple-900/10 backdrop-blur-2xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/80 bg-white/90 text-purple-600 shadow-lg shadow-purple-500/10 backdrop-blur-xl">
            <ShoppingBag className="h-10 w-10" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
            {t("emptyTitle")}
          </h2>
          <p className="text-sm font-medium leading-relaxed text-slate-600 mb-8">
            {t("emptyDescription")}
          </p>

          <Link
            href="/paquetes"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 py-4 font-bold text-white shadow-xl shadow-purple-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-600/35"
          >
            {t("exploreServices")}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-500  to-violet-500 px-4 py-12 text-slate-800 md:py-20">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-[32rem] w-[32rem] rounded-full bg-violet-300/20 blur-3xl" />

      <div className="relative mt-16 mx-4 z-10">
        {/* Header Header Glass Card */}
        <div className="mb-10 rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-xl shadow-purple-900/5 backdrop-blur-2xl md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-200/60 bg-gradient-to-br from-purple-500/10 to-violet-500/10 text-purple-600 shadow-sm backdrop-blur-md">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                {t("title")}
              </h1>
              <p className="mt-1 text-sm font-semibold text-purple-700/80">
                {t("itemsSelected", {
                  count: itemCount,
                  itemLabel: itemCount === 1 ? t("service") : t("services"),
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Listado de Servicios */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between gap-5 rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-xl shadow-purple-900/5 backdrop-blur-2xl transition-all duration-300 hover:border-purple-200 hover:bg-white/80 hover:shadow-2xl hover:shadow-purple-900/10 sm:flex-row sm:items-center"
              >
                {/* Details */}
                <div className="flex-1 space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-300/60 bg-purple-50/80 px-3 py-1 backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                      {t("badgeInteriorism")}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">
                    {item.product?.name ?? t("defaultServiceTitle")}
                  </h3>

                  {item.meta?.nombre && (
                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-100/70 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
                      <User className="h-3.5 w-3.5 text-purple-600" />
                      <span>
                        {t("assignedTo")}: {item.meta.nombre} {item.meta.apellidos}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Controls Area */}
                <div className="flex items-center justify-between gap-6 border-t border-slate-200/60 pt-4 sm:w-auto sm:border-t-0 sm:pt-0">
                  {/* Quantity Control Pill */}
                  <div className="flex items-center rounded-2xl border border-white/80 bg-slate-100/80 p-1 shadow-inner backdrop-blur-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-200/80 hover:text-purple-600 active:scale-95"
                      aria-label={t("decreaseQuantity")}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-extrabold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-200/80 hover:text-purple-600 active:scale-95"
                      aria-label={t("increaseQuantity")}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="min-w-[100px] text-right">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {t("subtotal")}
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      MXN {formatPrice(item.subtotal)}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-200/50 bg-rose-50/50 text-slate-400 transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                    title={t("removeService")}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del Pedido (Checkout box) */}
          <div className="h-fit space-y-6 rounded-[2.5rem] border border-white/80 bg-white/70 p-6 shadow-2xl shadow-purple-900/10 backdrop-blur-2xl md:p-8">
            <h2 className="border-b border-slate-200/60 pb-4 text-xl font-black tracking-tight text-slate-900">
              {t("summaryTitle")}
            </h2>

            <div className="space-y-3.5 text-sm font-medium">
              <div className="flex justify-between text-slate-600">
                <span>{t("subtotal")}</span>
                <span className="font-bold text-slate-900">
                  MXN {formatPrice(total)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t("taxesFees")}</span>
                <span className="text-xs text-slate-400">
                  {t("calculatedAtCheckout")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/60 pt-4">
              <span className="text-base font-bold text-slate-900">
                {t("estimatedTotal")}
              </span>
              <span className="text-2xl font-black text-purple-700">
                MXN {formatPrice(total)}
              </span>
            </div>

            {/* Enlace directo a la página de Checkout */}
            <Link
              href="/checkout"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 py-4 font-bold text-white shadow-xl shadow-purple-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-600/35 active:scale-[0.98]"
            >
              {t("proceedToCheckout")}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-center text-xs font-medium text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{t("securityNotice")}</span>
            </div>

            <div className="flex items-center justify-center gap-6 rounded-2xl border border-white/80 bg-slate-50/80 p-4 shadow-inner backdrop-blur-md">
              <Image
                src="/logo-keycop.webp"
                alt="etomin"
                width={110}
                height={28}
                className="object-contain"
              />
              <Image
                src="/secure-payment.png"
                alt="secure"
                width={130}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
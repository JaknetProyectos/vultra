"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import {
  ArrowRight,
  CreditCard,
  FileText,
  Package2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CustomPackagePage() {
  const t = useTranslations("customPackagePage");

  const { addItem } = useCart();

  const [folio, setFolio] = useState("");
  const [amount, setAmount] = useState("");

  const numericAmount = useMemo(() => {
    const parsed = Number(amount);
    return isNaN(parsed) ? 0 : parsed;
  }, [amount]);

  const formattedTotal = useMemo(() => {
    return numericAmount.toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [numericAmount]);

  const handleAddToCart = () => {
    if (!folio.trim()) return;
    if (numericAmount <= 0) return;

    addItem({
      id: `custom-package-${folio}-${Date.now()}`,
      meta: {
        customPackage: {
          id: `custom-package-${folio}-${Date.now()}`,
          name: `${t("product.name")} - ${folio}`,
          price: numericAmount,
          sku: folio,
        },
      },
    });

    setFolio("");
    setAmount("");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4fbf7] text-slate-800">
      <div className="relative mt-20">
        {/* Background Layer (Ethereal Light Glows - No Circuits) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-[500px] w-[500px] rounded-full bg-[#3DDC84]/20 blur-[140px]" />
          <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-teal-300/30 blur-[150px]" />
          <div className="absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-emerald-300/25 blur-[120px]" />

          {/* Soft Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(61,220,132,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(61,220,132,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative mb-10 overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-white/80" />
              <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#3DDC84]/25 blur-3xl" />
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />
            </div>

            <div className="relative z-10 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800 shadow-sm backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#2dbf6e]" />
                {t("hero.badge")}
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent">
                  {t("hero.title")}
                </span>
              </h1>

              <nav
                aria-label="Breadcrumb"
                className="mt-6 text-sm text-slate-600"
              >
                <ol className="flex flex-wrap items-center gap-2 font-medium">
                  <li>
                    <Link href="/" className="transition hover:text-emerald-700">
                      {t("breadcrumb.home")}
                    </Link>
                  </li>

                  <li className="text-slate-400">›</li>

                  <li>
                    <Link
                      href="/servicios"
                      className="transition hover:text-emerald-700"
                    >
                      {t("breadcrumb.services")}
                    </Link>
                  </li>

                  <li className="text-slate-400">›</li>

                  <li>
                    <Link
                      href="/paquetes"
                      className="transition hover:text-emerald-700"
                    >
                      {t("breadcrumb.packages")}
                    </Link>
                  </li>

                  <li className="text-slate-400">›</li>

                  <li className="font-semibold text-emerald-800">
                    {t("breadcrumb.current")}
                  </li>
                </ol>
              </nav>
            </div>
          </section>

          {/* Content Grid */}
          <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            {/* Image Card */}
            <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-2 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
              <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-emerald-50">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                  alt={t("product.imageAlt")}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.7),rgba(15,23,42,0.1),transparent)]" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur-md shadow-sm">
                    <Package2 className="h-4 w-4 text-[#2dbf6e]" />
                    {t("product.name")}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="rounded-[2.5rem] border border-white/80 bg-white/70 p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800 shadow-sm backdrop-blur-md">
                <FileText className="h-4 w-4 text-[#2dbf6e]" />
                {t("form.badge")}
              </div>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
                {t("product.name")}
              </h2>

              <div className="mt-4 space-y-3 text-base leading-relaxed text-slate-600">
                <p className="flex items-start gap-3 font-medium text-slate-700">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#2dbf6e]" />
                  {t("description.contactAdvisor")}
                </p>

                <p>{t("description.instructions")}</p>
              </div>

              {/* Form Fields */}
              <div className="mt-8 space-y-6">
                {/* Folio */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <FileText className="h-4 w-4 text-[#2dbf6e]" />
                    {t("form.folioLabel")}
                  </label>

                  <input
                    type="text"
                    placeholder={t("form.folioPlaceholder")}
                    value={folio}
                    onChange={(e) => setFolio(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white/90 px-5 text-slate-900 font-medium outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <CreditCard className="h-4 w-4 text-[#2dbf6e]" />
                    {t("form.amountLabel")}
                  </label>

                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                      $
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white/90 pl-10 pr-5 text-slate-900 font-medium outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
                    />
                  </div>
                </div>

                {/* Total Preview */}
                <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white/90 p-6 shadow-sm backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                        {t("total.label")}
                      </p>

                      <h3 className="mt-2 text-4xl font-extrabold text-slate-900">
                        ${formattedTotal}
                      </h3>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/15 shadow-sm">
                      <ShoppingCart className="h-6 w-6 text-[#2dbf6e]" />
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={!folio.trim() || numericAmount <= 0}
                  className="group h-14 w-full rounded-2xl bg-gradient-to-r from-[#2dbf6e] to-teal-600 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.01] hover:brightness-110 hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t("form.addToCart")}

                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
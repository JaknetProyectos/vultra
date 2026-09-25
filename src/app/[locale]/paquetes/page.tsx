"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Check,
  ArrowRight,
  ShoppingCart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

import Image from "next/image";

import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";
import { useMainPackages } from "@/hooks/useMainPackages";
import { useConsultingServices } from "@/hooks/useConsultingServices";

export default function PaquetesPage() {
  const t = useTranslations("packages");
  const locale = useLocale();
  const { mainPackages } = useMainPackages();
  const { consultingServices } = useConsultingServices();

  const { addItem } = useCart();

  const [addedId, setAddedId] = useState<string | null>(null);

  const glowCircles = useMemo(
    () => (
      <>
        <div className="absolute left-[-180px] top-[-120px] h-[450px] w-[450px] rounded-full bg-[#3DDC84]/20 blur-[140px]" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[450px] w-[450px] rounded-full bg-teal-300/30 blur-[140px]" />
      </>
    ),
    []
  );

  const handleAddToCart = (pkg: {
    id: string;
    name: string;
    price: number;
    sku?: string;
  }) => {
    addItem({
      id: pkg.id,
    });

    setAddedId(pkg.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1800);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4fbf7] text-slate-800">
      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* Main Packages */}
      <section className="relative overflow-hidden px-4 py-20">
        {glowCircles}

        {/* Clean Soft Grid & Glow Background */}
        <div className="absolute inset-0">
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

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 backdrop-blur-xl shadow-sm">
              <Sparkles className="h-4 w-4 text-[#2dbf6e]" />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                {t("main.badge")}
              </span>
            </div>

            <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent">
                {t("main.title")}
              </span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mainPackages.map((pkg, i) => {
              const added = addedId === pkg.id;

              return (
                <Card
                  key={pkg.id}
                  className={`group relative overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1.5 ${
                    pkg.featured
                      ? "border-emerald-500/40 bg-gradient-to-b from-emerald-50/90 via-white/80 to-white/90 shadow-[0_20px_50px_rgba(61,220,132,0.18)] backdrop-blur-2xl"
                      : "border-white/80 bg-white/70 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl hover:border-emerald-500/30 hover:shadow-lg"
                  }`}
                >
                  {/* Glow Highlights */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3DDC84]/60 to-transparent" />

                    <div className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-emerald-300/[0.12] blur-2xl transition-all duration-1000 group-hover:left-[130%]" />
                  </div>

                  {pkg.featured && (
                    <div className="absolute right-5 top-5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 shadow-sm backdrop-blur-md">
                      {t("main.featured")}
                    </div>
                  )}

                  <CardHeader className="relative pb-3 pt-8">
                    <span className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                      {t("main.packageLabel", { number: i })}
                    </span>

                    <h3 className="text-2xl font-black tracking-tight text-slate-900">
                      {pkg.name}
                    </h3>

                    <p className="mt-4 text-3xl font-black text-emerald-700">
                      MXN ${pkg.price.toLocaleString()}.00{" "}
                      <span className="text-sm font-medium text-slate-500">
                        {t("main.tax")}
                      </span>
                    </p>

                    {pkg.sku && (
                      <p className="mt-2 font-mono text-[11px] font-semibold tracking-[0.15em] text-slate-400">
                        SKU: {pkg.sku}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="relative pb-8 pt-3">
                    <ul className="mb-8 space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-sm">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>

                          <span className="text-sm font-medium leading-relaxed text-slate-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleAddToCart(pkg)}
                      className={`group/btn relative w-full overflow-hidden rounded-2xl py-6 text-sm font-bold shadow-md transition-all duration-300 ${
                        pkg.featured
                          ? "bg-gradient-to-r from-[#2dbf6e] to-teal-600 text-white shadow-emerald-500/20 hover:brightness-110 hover:shadow-emerald-500/30"
                          : "border border-emerald-500/20 bg-white/90 text-emerald-900 hover:border-emerald-500/40 hover:bg-emerald-50/60"
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {added ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            {t("buttons.added")}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                            {t("buttons.startNow")}
                          </>
                        )}
                      </span>

                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consulting */}
      <section className="relative overflow-hidden border-y border-emerald-900/5 bg-gradient-to-b from-white/40 to-emerald-50/30 px-4 py-20">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-[#3DDC84]/15 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-teal-300/20 blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="mx-auto mb-5 max-w-4xl text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
              {t("consulting.title")}
            </h2>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600">
              {t("consulting.description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {consultingServices.map((service) => {
              const added = addedId === service.id;

              return (
                <Card
                  key={service.id}
                  className={`group relative overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1.5 ${
                    service.featured
                      ? "border-emerald-500/40 bg-gradient-to-b from-emerald-50/90 via-white/80 to-white/90 shadow-[0_20px_50px_rgba(61,220,132,0.18)] backdrop-blur-2xl"
                      : "border-white/80 bg-white/70 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl hover:border-emerald-500/30 hover:shadow-lg"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3DDC84]/50 to-transparent" />
                  </div>

                  <CardHeader className="relative pb-3 pt-8">
                    <h3 className="text-xl font-black leading-tight text-slate-900">
                      {service.name}
                    </h3>

                    <p className="mt-4 text-3xl font-black text-emerald-700">
                      MXN ${service.price.toLocaleString()}.00{" "}
                      <span className="text-sm font-medium text-slate-500">
                        {t("main.tax")}
                      </span>
                    </p>
                  </CardHeader>

                  <CardContent className="relative pb-8 pt-3">
                    <ul className="mb-8 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-sm">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>

                          <span className="text-sm font-medium leading-relaxed text-slate-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleAddToCart(service)}
                      className={`group/btn relative w-full overflow-hidden rounded-2xl py-6 text-sm font-bold shadow-md transition-all duration-300 ${
                        service.featured
                          ? "bg-gradient-to-r from-[#2dbf6e] to-teal-600 text-white shadow-emerald-500/20 hover:brightness-110 hover:shadow-emerald-500/30"
                          : "border border-emerald-500/20 bg-white/90 text-emerald-900 hover:border-emerald-500/40 hover:bg-emerald-50/60"
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {added ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            {t("buttons.added")}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                            {t("buttons.startNow")}
                          </>
                        )}
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute left-[-180px] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[#3DDC84]/20 blur-[140px]" />
        <div className="absolute right-[-180px] top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-teal-300/30 blur-[140px]" />

        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 rounded-[2.5rem] border border-white/80 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl md:grid-cols-2 md:p-10">
          <div className="relative overflow-hidden rounded-[1.8rem] border border-emerald-900/10 shadow-md">
            <Image
              src={getOptimizedUrl(
                "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              )}
              alt={t("cta.imageAlt")}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </div>

          <div className="text-slate-800">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
              {t("cta.badge")}
            </p>

            <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
              {t("cta.title")}
            </h2>

            <p className="mb-8 text-base leading-relaxed text-slate-600">
              {t("cta.description")}
            </p>

            <Link href={"/paquete-personalizado"}>
              <Button className="group rounded-2xl bg-gradient-to-r from-[#2dbf6e] to-teal-600 px-7 py-6 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:brightness-110 hover:shadow-emerald-500/30">
                {t("cta.button")}

                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useHomePackages } from "@/hooks/useHomePackages";
import { getOptimizedUrl } from "@/lib/images";

export default function Pricing() {
  const t = useTranslations("pricing");
  const { homepagePackages } = useHomePackages();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-300 to-emerald-300/50 px-4 py-24 text-slate-800">
      {/* Background Image & Ambient Glows */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={getOptimizedUrl(
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop"
          )}
          alt="Pricing Background"
          fill
          className="object-cover opacity-80 mix-blend-overlay"
        />

        {/* Ambient Light Glows */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet-400/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-emerald-400/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-800">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {t("title")}
          </h2>
        </div>

        {/* Cards */}
        <div className="mb-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {homepagePackages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`relative overflow-hidden rounded-[2.2rem] border transition-all duration-300 hover:-translate-y-1.5 ${
                pkg.featured
                  ? "border-violet-400/80 bg-white/90 shadow-2xl shadow-violet-900/15 backdrop-blur-2xl"
                  : "border-white/80 bg-white/70 shadow-xl shadow-violet-900/5 backdrop-blur-xl hover:border-violet-300"
              }`}
            >
              {/* Popular badge */}
              {pkg.featured && (
                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-md">
                  {t("popular")}
                </div>
              )}

              <CardHeader className="relative pb-2 pt-8">
                <h3 className="text-2xl font-black text-violet-700 md:text-3xl">
                  {pkg.name}
                </h3>

                <p className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
                  MXN {pkg.price}{" "}
                  <span className="text-sm font-semibold text-slate-500">
                    {t("tax")}
                  </span>
                </p>
              </CardHeader>

              <CardContent className="relative pb-8 pt-6">
                <ul className="mb-8 space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 shadow-sm">
                        <Check className="h-3 w-3 stroke-[3] text-white" />
                      </div>

                      <span className="text-sm font-medium leading-relaxed text-slate-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={"/paquetes"}>
                  <Button
                    className={`h-11 w-full rounded-full text-sm font-bold transition-all duration-300 ${
                      pkg.featured
                        ? "bg-gradient-to-r from-violet-600 to-emerald-500 text-white shadow-lg shadow-violet-600/25 hover:scale-[1.02] hover:shadow-xl"
                        : "border border-slate-200 bg-white/80 text-slate-800 shadow-sm hover:border-violet-300 hover:bg-white"
                    }`}
                  >
                    {t("moreInfo")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href={"/paquetes"}>
            <Button className="group h-12 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-8 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-600/35">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
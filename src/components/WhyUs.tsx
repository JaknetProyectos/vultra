"use client";

import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";

export default function WhyUs() {
  const t = useTranslations("whyUs");
  const distinguishingFeatures = t.raw(
    "distinguishingFeatures"
  ) as string[];

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-gradient-to-br from-purple-300  to-violet-300/50 px-4 py-24 text-slate-800"
    >
      {/* Background Image & Ambient Glows */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={getOptimizedUrl(
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
          )}
          alt="Why Us Background"
          fill
          className="object-cover opacity-80 mix-blend-overlay"
        />

        {/* Ambient Light Glows */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet-400/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-emerald-400/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              {/* Backlight Aura */}
              <div className="absolute inset-0 scale-105 rounded-[2.5rem] bg-gradient-to-r from-violet-400/40 to-emerald-400/40 blur-3xl" />

              {/* iOS Glass Card Frame */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/60 p-3 shadow-2xl shadow-violet-900/10 backdrop-blur-2xl">
                <Image
                  src={getOptimizedUrl(
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )}
                  alt={t("imageAlt")}
                  width={450}
                  height={550}
                  className="rounded-[2rem] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-violet-800">
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
              {t("title")}
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700 font-medium">
              {t("description")}
            </p>

            {/* Features */}
            <ul className="mt-10 space-y-4">
              {distinguishingFeatures.map((feature) => (
                <li
                  key={feature}
                  className="group flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-violet-300 hover:bg-white/90 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Check className="h-4 w-4 stroke-[3] text-white" />
                  </div>

                  <span className="text-base font-bold text-slate-800">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Link href={"/nosotros"}>
                <Button className="group h-12 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-emerald-500 px-8 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-600/35">
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
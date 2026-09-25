"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getOptimizedUrl } from "@/lib/images";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CtaSection() {
  const t = useTranslations("ctaSection");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-300 to-violet-300/50 px-4 py-20 text-slate-800">
      {/* Background Image & Ambient Glows */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={getOptimizedUrl(
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
          )}
          alt="CTA Background"
          fill
          className="object-cover opacity-80 mix-blend-overlay"
        />

        {/* Ambient Light Glows */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet-400/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-purple-400/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* iOS Glass Card */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 shadow-2xl shadow-purple-900/10 backdrop-blur-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-80 min-h-[400px] lg:h-auto">
              <Image
                src={getOptimizedUrl(
                  "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                )}
                alt={t("imageAlt")}
                fill
                className="object-cover object-top"
              />

              {/* Light Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-10 lg:p-14">
              {/* Badge */}
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-purple-300/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-purple-800">
                  {t("badge")}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                {t("title")}
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-700">
                {t("description")}
              </p>

              {/* CTA */}
              <div className="mt-10">
                <Link href={"/servicios"}>
                  <Button className="group h-12 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 px-8 text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/35">
                    {t("button")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
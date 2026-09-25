"use client";

import Image from "next/image";
import { Cpu, Sparkles, Code2, Terminal, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { getOptimizedUrl } from "@/lib/images";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-violet-500  to-purple-500-50/30 text-slate-800">
      {/* Background Unsplash Ambient & Glows */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={getOptimizedUrl(
            "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          )}
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-20 mix-blend-multiply"
        />

        {/* Floating Light Ambient Glows */}
        <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            {/* Label Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl transition-transform hover:scale-105">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-violet-700">
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl lg:leading-[1.1]">
              {t("title.first")}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
                {" "}
                {t("title.highlight")}{" "}
              </span>
              {t("title.last")}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              {t("description")}
            </p>
          </div>

          {/* Image & Floating White Icon Chips */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating White Glass Icon Badges (iOS Style) */}
              <div className="absolute -left-6 top-12 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 p-3 shadow-lg shadow-violet-950/5 backdrop-blur-md transition-transform duration-300 hover:scale-110">
                <Code2 className="h-6 w-6 text-violet-600" />
              </div>

              <div className="absolute -right-4 top-1/3 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 p-3 shadow-lg shadow-violet-950/5 backdrop-blur-md transition-transform duration-300 hover:scale-110">
                <Cpu className="h-6 w-6 text-emerald-500" />
              </div>

              <div className="absolute bottom-10 -left-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 p-3 shadow-lg shadow-violet-950/5 backdrop-blur-md transition-transform duration-300 hover:scale-110">
                <Terminal className="h-6 w-6 text-violet-600" />
              </div>

              <div className="absolute -bottom-4 right-12 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 p-3 shadow-lg shadow-violet-950/5 backdrop-blur-md transition-transform duration-300 hover:scale-110">
                <Layers className="h-6 w-6 text-emerald-500" />
              </div>

              {/* Main Image Frame (iOS Rounded Glass Card) */}
              <div className="relative rounded-[2.5rem] border border-white/80 bg-white/60 p-3 shadow-2xl shadow-violet-900/10 backdrop-blur-2xl">
                <div className="relative h-[400px] w-[300px] overflow-hidden rounded-[2rem] border border-slate-100 sm:h-[480px] sm:w-[380px] md:h-[520px] md:w-[420px]">
                  <Image
                    src={getOptimizedUrl(
                      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    )}
                    alt={t("imageAlt")}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Soft Light Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Backlight soft aura */}
              <div className="absolute inset-0 -z-10 scale-105 rounded-full bg-gradient-to-r from-violet-400/30 to-emerald-300/30 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
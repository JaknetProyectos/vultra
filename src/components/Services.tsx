"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useServices } from "@/hooks/useServices";
import { getOptimizedUrl } from "@/lib/images";

export default function Services() {
  const t = useTranslations("servicesSection");
  const { services } = useServices();

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= services.length - 2 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? services.length - 3 : prev - 1
    );
  };

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-gradient-to-br from-green-300  to-emerald-300/50 px-4 py-20 text-slate-800"
    >
      {/* Background with Unsplash Tech Image & Soft Glows */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={getOptimizedUrl(
            "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          )}
          alt="Programming Background"
          fill
          className="object-cover opacity-80 mix-blend-multiply"
        />

        {/* Soft Ambient Light Glows */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl transition-transform hover:scale-105">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-700">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {t("title")}
          </h2>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden p-2">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3 + 2)}%)`,
            }}
          >
            {services.map((service) => (
              <div
                key={service.slug}
                className="group w-full flex-shrink-0 cursor-pointer md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                {/* iOS Glass Card */}
                <div className="overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/70 shadow-xl shadow-violet-900/5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300/60 hover:shadow-2xl hover:shadow-violet-900/10">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden p-3">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                      <Image
                        src={service.heroImage}
                        alt={service.titulo}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex items-center justify-between p-6 pt-2">
                    <h3 className="pr-4 text-lg font-extrabold leading-snug text-slate-900">
                      {service.titulo}
                    </h3>

                    <Link href={`/servicios/${service.slug}`}>
                      <button
                        type="button"
                        aria-label={t("viewService")}
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-emerald-500 hover:shadow-lg hover:shadow-violet-600/30"
                      >
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={prevSlide}
            type="button"
            aria-label={t("previous")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-violet-300 hover:bg-white hover:text-violet-600 hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={nextSlide}
            type="button"
            aria-label={t("next")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-violet-300 hover:bg-white hover:text-violet-600 hover:shadow-md"
          >
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link href={"/servicios"}>
            <Button className="h-12 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-emerald-500 px-8 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-600/35">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
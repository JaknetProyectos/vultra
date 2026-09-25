"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import Image from "next/image";
import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import { getOptimizedUrl } from "@/lib/images";
import { useServices } from "@/hooks/useServices";

export default function ServiciosPage() {
  const t = useTranslations("services");
  const { services } = useServices();

  const serviceButtons = services.map((s) => ({
    id: s.slug,
    label: s.titulo,
  }));

  const scrollToService = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4fbf7] text-slate-800">

      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* Navigation Filter Buttons */}
      <section className="relative overflow-hidden border-b border-emerald-900/5 px-4 py-10">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-[#3DDC84]/20 blur-[130px]" />
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-teal-300/25 blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(61,220,132,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(61,220,132,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3.5">
            {serviceButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => scrollToService(btn.id)}
                type="button"
                className="group relative overflow-hidden rounded-full border border-white/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-emerald-50/80 hover:text-emerald-950 hover:shadow-md"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#2dbf6e] transition-transform duration-300 group-hover:rotate-12" />
                  {btn.label}
                </span>

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3DDC84]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="relative overflow-hidden px-4 py-16">
        {/* Ethereal Glow Background Layer - No PCB circuits */}
        <div className="absolute inset-0">
          <div className="absolute left-[-140px] top-[15%] h-[400px] w-[400px] rounded-full bg-[#3DDC84]/20 blur-[140px]" />
          <div className="absolute right-[-120px] bottom-[10%] h-[380px] w-[380px] rounded-full bg-teal-300/30 blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
          {services.map((service, index) => (
            <div
              key={service.slug}
              id={service.slug}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_25px_60px_rgba(61,220,132,0.12)]"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[#3DDC84]/15 blur-[90px]" />
                <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-teal-300/20 blur-[90px]" />
              </div>

              <div
                className={`relative z-10 grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#3DDC84]/25 to-teal-300/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/50 shadow-sm">
                    <Image
                      src={service.heroImage}
                      alt={service.titulo}
                      width={700}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent" />
                  </div>
                </div>

                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 shadow-sm backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-[#2dbf6e]" />
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                      {t("service.badge")}
                    </span>
                  </div>

                  <h2 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                    <span className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent">
                      {service.titulo}
                    </span>
                  </h2>

                  <p className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg">
                    {service.descripcion}
                  </p>

                  <Link href={`/servicios/${service.slug}`}>
                    <Button className="group/btn h-12 rounded-2xl bg-gradient-to-r from-[#2dbf6e] to-teal-600 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:brightness-110 hover:shadow-emerald-500/30">
                      <span className="flex items-center gap-2">
                        {t("service.readMore")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3DDC84]/30 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(61,220,132,0.15),transparent_60%),#f4fbf7]" />
        <div className="absolute left-[-100px] bottom-[-100px] h-[350px] w-[350px] rounded-full bg-[#3DDC84]/20 blur-[130px]" />
        <div className="absolute right-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full bg-teal-300/25 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative min-h-[350px] overflow-hidden">
                <Image
                  src={getOptimizedUrl(
                    "https://plus.unsplash.com/premium_photo-1674478876962-6703253531c4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )}
                  alt={t("cta.imageAlt")}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/60 lg:to-white/90" />
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 shadow-sm backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-[#2dbf6e]" />
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                    {t("cta.badge")}
                  </span>
                </div>

                <h2 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                  {t("cta.title")}
                </h2>

                <p className="mb-8 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {t("cta.description")}
                </p>

                <div>
                  <Link href="/paquetes">
                    <Button className="group h-12 rounded-2xl bg-gradient-to-r from-[#2dbf6e] to-teal-600 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:brightness-110 hover:shadow-emerald-500/30">
                      <span className="flex items-center gap-2">
                        {t("cta.button")}
                        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
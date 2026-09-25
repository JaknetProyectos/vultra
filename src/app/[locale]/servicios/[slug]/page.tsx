"use client";

import { use } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  Globe,
  Layers3,
  Rocket,
  Star,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useServices } from "@/hooks/useServices";
import { Servicio } from "@/data/services";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800 backdrop-blur-md shadow-sm">
        <Icon className="h-4 w-4 text-[#2dbf6e]" />
        {title}
      </div>

      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function ServicePage({ params }: Props) {
  const { slug } = use(params);
  const t = useTranslations("serviceDetail");
  const { services } = useServices();

  const servicio = services.find((item) => item.slug === slug) as
    | Servicio
    | undefined;

  const otherServices = services.filter((item) => item.slug !== slug);

  if (!servicio) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f4fbf7] text-slate-800">
        <div className="relative mt-20">
          {/* Background Layer (Light Glass Glows) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#3DDC84]/20 blur-[120px]" />
            <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-teal-300/25 blur-[130px]" />
            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/40 blur-[100px]" />
            
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(61,220,132,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(61,220,132,0.12) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100vh-140px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="w-full rounded-[2.5rem] border border-white/80 bg-white/70 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-2xl sm:p-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800">
                <Rocket className="h-4 w-4 text-[#2dbf6e]" />
                {t("hero.tag")}
              </div>

              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {t("notFound.title")}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
                {t("notFound.description")}
              </p>

              <div className="mt-8">
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2dbf6e] to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110 hover:shadow-emerald-500/30"
                >
                  {t("notFound.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4fbf7] text-slate-800">
      <div className="relative mt-20">
        {/* Background Layer (Ethereal Glows - No PCB Circuit lines) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-[500px] w-[500px] rounded-full bg-[#3DDC84]/20 blur-[140px]" />
          <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-teal-300/30 blur-[150px]" />
          <div className="absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-emerald-300/25 blur-[120px]" />

          {/* Clean Soft Grid */}
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

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Hero Banner Section */}
          <section className="relative mb-10 overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
            <div className="absolute inset-0">
              {servicio.heroImage ? (
                <Image
                  src={servicio.heroImage}
                  alt={servicio.titulo}
                  fill
                  priority
                  className="object-cover opacity-15 mix-blend-multiply"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-teal-50/40 to-white" />
              )}

              <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#3DDC84]/25 blur-3xl" />
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />
            </div>

            <div className="relative z-10 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800 shadow-sm backdrop-blur-md">
                <Rocket className="h-4 w-4 text-[#2dbf6e]" />
                {t("hero.tag")}
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 bg-clip-text text-transparent">
                  {servicio.titulo}
                </span>
              </h1>

              <nav aria-label="Breadcrumb" className="mt-6 text-sm text-slate-600">
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
                  <li className="font-semibold text-emerald-800">
                    {servicio.titulo}
                  </li>
                </ol>
              </nav>
            </div>
          </section>

          {/* Feature Image + Other Services */}
          <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-2 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-emerald-50/50">
                {servicio.featureImage ? (
                  <Image
                    src={servicio.featureImage}
                    alt={servicio.titulo}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-100/60 via-teal-50 to-emerald-50">
                    <div className="text-center">
                      <div className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-700">
                        {t("feature.placeholderLabel")}
                      </div>
                      <div className="mt-3 text-lg font-semibold text-slate-700">
                        {t("feature.placeholderDescription")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <aside className="rounded-[2.5rem] border border-white/80 bg-white/70 p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
              <SectionTitle
                icon={Globe}
                title={t("aside.title")}
                subtitle={t("aside.subtitle")}
              />

              <div className="space-y-2.5">
                {otherServices.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/servicios/${item.slug}`}
                    className="group flex items-start gap-3 rounded-2xl border border-emerald-900/5 bg-white/80 px-4 py-3.5 text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-50/60 hover:text-emerald-900 hover:shadow-md"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 transition-transform duration-300 group-hover:scale-110">
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-sm font-semibold leading-6">{item.titulo}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </section>

          {/* Description, Benefits and Process */}
          <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[2.5rem] border border-white/80 bg-white/70 p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
              <SectionTitle
                icon={Layers3}
                title={t("description.title")}
                subtitle={t("description.subtitle")}
              />

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {servicio.titulo}
              </h2>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
                {servicio.descripcion.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10">
                <SectionTitle
                  icon={BadgeCheck}
                  title={t("benefits.title")}
                  subtitle={t("benefits.subtitle")}
                />

                <ul className="mt-5 space-y-3">
                  {servicio.beneficios.map((beneficio, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3.5 rounded-2xl border border-emerald-900/5 bg-white/80 px-4 py-3.5 text-slate-700 shadow-sm"
                    >
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#3DDC84] ring-4 ring-emerald-500/10" />
                      <span className="text-sm font-medium leading-relaxed">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/80 bg-white/70 p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
              <SectionTitle
                icon={Sparkles}
                title={t("process.title")}
                subtitle={t("process.subtitle")}
              />

              <div className="mt-6 space-y-3.5">
                {servicio.comoLoHacemos.map((paso, index) => (
                  <details
                    key={index}
                    className="group rounded-2xl border border-emerald-900/5 bg-white/80 p-4 shadow-sm transition-all duration-300 open:border-emerald-500/30 open:bg-emerald-50/40 open:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-bold text-slate-900">
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 shadow-sm">
                          <Star className="h-4 w-4" />
                        </span>
                        <span>{paso.titulo}</span>
                      </span>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-transform duration-300 group-open:rotate-180 group-open:border-emerald-500/30 group-open:text-emerald-700">
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </summary>

                    <div className="mt-4 border-l-2 border-[#3DDC84] pl-4 text-sm leading-relaxed text-slate-600">
                      {paso.descripcion}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
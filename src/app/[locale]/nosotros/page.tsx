"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import WhyUs from "@/components/WhyUs";

import {
  Lightbulb,
  Award,
  Users,
  Heart,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import Image from "next/image";

import { useTranslations } from "next-intl";

import { getOptimizedUrl } from "@/lib/images";

// Map icon strings to components
const iconMap = {
  Lightbulb,
  Award,
  Users,
  Heart,
};

export default function NosotrosPage() {
  const t = useTranslations("aboutPage");
  const companyValues = t.raw("companyValues") as {
    icon: keyof typeof iconMap;
    title: string;
    description: string;
  }[];

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a120e]">

      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* About */}
      <section className="relative overflow-hidden px-4 py-24">
        {/* Background Layer with iOS Glassmorphism & Android Green Aura */}
        <div className="absolute inset-0">
          <div className="absolute left-[-100px] top-[-50px] h-[450px] w-[450px] rounded-full bg-[#3DDC84]/20 blur-[140px]" />
          <div className="absolute bottom-[-100px] right-[-80px] h-[450px] w-[450px] rounded-full bg-teal-400/20 blur-[140px]" />
          <div className="absolute left-1/3 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[150px]" />

          {/* Light Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(61,220,132,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(61,220,132,0.2) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
            }}
          />

          {/* PCB lines */}
          <svg
            className="absolute inset-0 h-full w-full opacity-35"
            viewBox="0 0 1600 900"
            fill="none"
          >
            <defs>
              <linearGradient
                id="aboutLines"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3DDC84" stopOpacity="0" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 220 H340 L420 140 H760"
              stroke="url(#aboutLines)"
              strokeWidth="2"
            />

            <path
              d="M980 500 H1240 L1320 420 H1600"
              stroke="url(#aboutLines)"
              strokeWidth="2"
            />

            {[420, 1320].map((x, i) => (
              <polygon
                key={i}
                points={`
                  ${x},122
                  ${x + 14},130
                  ${x + 14},146
                  ${x},154
                  ${x - 14},146
                  ${x - 14},130
                `}
                stroke="#3DDC84"
                strokeWidth="1.5"
                fill="rgba(61,220,132,0.12)"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Image Container with Apple-style Frosted Glass Layering */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[#3DDC84]/25 via-teal-400/15 to-transparent blur-2xl pointer-events-none" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/25 bg-white/[0.08] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-500 hover:border-white/35">
                <Image
                  src={getOptimizedUrl(
                    "https://images.unsplash.com/photo-1574645434327-cb7970fe2e13?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  )}
                  alt={t("about.imageAlt")}
                  width={700}
                  height={500}
                  className="rounded-[1.8rem] object-cover"
                />

                <div className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-t from-[#0a120e]/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 backdrop-blur-xl shadow-inner">
                <Sparkles className="h-4 w-4 text-[#3DDC84]" />

                <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                  {t("about.badge")}
                </span>
              </div>

              <h2 className="mb-7 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
                  {t("about.title")}
                </span>
              </h2>

              <p className="text-lg leading-relaxed text-emerald-100/80">
                {t("about.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3.5 text-sm font-medium text-slate-200 shadow-lg backdrop-blur-xl transition-all hover:bg-white/[0.1] hover:border-emerald-400/30">
                  <ShieldCheck className="h-4 w-4 text-[#3DDC84]" />
                  {t("about.features.custom")}
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3.5 text-sm font-medium text-slate-200 shadow-lg backdrop-blur-xl transition-all hover:bg-white/[0.1] hover:border-emerald-400/30">
                  <Sparkles className="h-4 w-4 text-[#3DDC84]" />
                  {t("about.features.performance")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden border-y border-white/10 px-4 py-24">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(61,220,132,0.15),transparent_65%),#0a1410]" />

        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-[#3DDC84]/15 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-teal-500/15 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 backdrop-blur-xl shadow-inner">
              <Sparkles className="h-4 w-4 text-[#3DDC84]" />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                {t("values.badge")}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
                {t("values.title")}
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value) => {
              const IconComponent =
                iconMap[value.icon as keyof typeof iconMap];

              return (
                <div
                  key={value.title}
                  className="group relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-white/[0.06] p-8 text-center shadow-[0_15px_35px_rgba(0,0,0,0.2)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:bg-white/[0.09]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3DDC84]/50 to-transparent" />

                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/30 bg-[#3DDC84]/15 shadow-[0_0_25px_rgba(61,220,132,0.2)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    {IconComponent && (
                      <IconComponent className="h-8 w-8 text-[#3DDC84]" />
                    )}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-emerald-100/70">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <WhyUs />

      <CtaSection />

    </main>
  );
}
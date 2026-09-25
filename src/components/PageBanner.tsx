"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageBannerProps {
  title: string;
  breadcrumb: string;
}

export default function PageBanner({
  title,
  breadcrumb,
}: PageBannerProps) {
  return (
    <section className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden px-4 pb-16 pt-32">
      {/* Background image (Conservada) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Dark overlay & Android Green Gradients */}
      <div className="absolute inset-0 bg-[#060d08]/80 backdrop-blur-[2px]" />
      
      {/* Subtle Android Green Glow Spots */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[600px] rounded-full bg-emerald-500/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-green-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 h-[280px] w-[280px] rounded-full bg-teal-400/15 blur-[120px] pointer-events-none" />

      {/* Minimal Tech Grid Pattern with Android Green Tones */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Container - Apple Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.07] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-500 hover:border-white/30 hover:bg-white/[0.09]">
          
          {/* Internal Reflective Light Stroke */}
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                {breadcrumb}
              </span>
            </div>

            {/* Title with Soft Gradient */}
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-b from-white via-slate-100 to-emerald-200/90 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {/* Breadcrumb Capsule Pill */}
            <nav className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.12] hover:border-white/25">
   

              <div className="flex items-center text-emerald-400/80">
                <ChevronRight className="h-3.5 w-3.5" />
              </div>

              <span className="text-xs font-bold text-emerald-300">
                {breadcrumb}
              </span>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
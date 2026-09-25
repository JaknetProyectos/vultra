"use client";

import { useState } from "react";
import PageBanner from "@/components/PageBanner";
import CtaSection from "@/components/CtaSection";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useContact } from "@/hooks/useContact";

export default function ContactoPage() {
  const t = useTranslations("contactPage");

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { sendContactForm, isLoading } = useContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const response = await sendContactForm({
      nombre: formData.nombre,
      telefono: formData.telefono,
      email: formData.email,
      mensaje: formData.mensaje,
    });

    if (response.success) {
      setSuccessMessage(t("messages.success"));

      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        mensaje: "",
      });
    } else {
      setErrorMessage(
        response.error || t("messages.error")
      );
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-green-300">

      <PageBanner
        title={t("banner.title")}
        breadcrumb={t("banner.breadcrumb")}
      />

      {/* Contact Section */}
      <section className="relative overflow-hidden px-4 py-20">
        {/* Background Gradients & Effects */}
        <div className="absolute inset-0">
          {/* Android Green Orbs */}
          <div className="absolute left-[-140px] top-[-120px] h-[450px] w-[450px] rounded-full bg-emerald-500/20 blur-[140px]" />
          <div className="absolute bottom-[-140px] right-[-120px] h-[450px] w-[450px] rounded-full bg-green-500/20 blur-[140px]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "74px 74px",
            }}
          />

          {/* Original SVG lines preserved & color adapted */}
          <svg
            className="absolute inset-0 h-full w-full opacity-25"
            viewBox="0 0 1600 900"
            fill="none"
          >
            <defs>
              <linearGradient
                id="contactLine"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 240 H260 L340 160 H620"
              stroke="url(#contactLine)"
              strokeWidth="2"
            />

            <path
              d="M980 340 H1220 L1320 240 H1600"
              stroke="url(#contactLine)"
              strokeWidth="2"
            />

            {[340, 1320].map((x, i) => (
              <polygon
                key={i}
                points={`
                  ${x},142
                  ${x + 16},151
                  ${x + 16},169
                  ${x},178
                  ${x - 16},169
                  ${x - 16},151
                `}
                stroke="#34d399"
                strokeWidth="1.5"
                fill="rgba(16, 185, 129, 0.08)"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Info Panel - Apple Style White Glassmorphism Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-8 md:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:shadow-emerald-500/10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                  {t("info.badge")}
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                {t("info.title")}
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-600 font-medium">
                {t("info.description")}
              </p>
            </div>

            {/* Form Panel - Apple Style White Glassmorphism Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 p-8 md:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="nombre"
                      placeholder={t("form.name")}
                      value={formData.nombre}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-slate-200/80 bg-white/60 px-5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="telefono"
                      placeholder={t("form.phone")}
                      value={formData.telefono}
                      onChange={handleChange}
                      className="h-14 w-full rounded-2xl border border-slate-200/80 bg-white/60 px-5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    className="h-14 w-full rounded-2xl border border-slate-200/80 bg-white/60 px-5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="mensaje"
                    placeholder={t("form.message")}
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={6}
                    className="w-full resize-none rounded-2xl border border-slate-200/80 bg-white/60 px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    required
                  />
                </div>

                {successMessage && (
                  <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-50/80 px-4 py-4 text-sm font-semibold text-emerald-800 backdrop-blur-md">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-50/80 px-4 py-4 text-sm font-semibold text-rose-800 backdrop-blur-md">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="group h-14 min-w-[220px] rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:brightness-105 hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("form.sending")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t("form.submit")}
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />

    </main>
  );
}
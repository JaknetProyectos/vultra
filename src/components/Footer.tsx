"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Rocket,
  Layers3,
  Package,
  Mail,
  Smartphone,
  Code2,
  Workflow,
  Cpu,
  Bot,
  ShieldCheck,
  FileText,
  ReceiptText,
  BadgeDollarSign,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  const links = [
    {
      name: t("navigation.about"),
      href: "/nosotros",
      icon: Rocket,
    },
    {
      name: t("navigation.services"),
      href: "/servicios",
      icon: Layers3,
    },
    {
      name: t("navigation.packages"),
      href: "/paquetes",
      icon: Package,
    },
    {
      name: t("navigation.contact"),
      href: "/contacto",
      icon: Mail,
    },
  ];

  const services = [
    {
      name: t("services.mobileApps"),
      href: "/servicios/desarrollo-de-aplicaciones-moviles",
      icon: Smartphone,
    },
    {
      name: t("services.customSoftware"),
      href: "/servicios/desarrollo-de-software-a-medida",
      icon: Code2,
    },
    {
      name: t("services.systemIntegration"),
      href: "/servicios/integracion-de-sistemas",
      icon: Workflow,
    },
    {
      name: t("services.techConsulting"),
      href: "/servicios/consultoria-tecnologica",
      icon: Cpu,
    },
    {
      name: t("services.automation"),
      href: "/servicios/automatizacion-de-procesos",
      icon: Bot,
    },
    {
      name: t("services.support"),
      href: "/servicios/soporte-y-mantenimiento",
      icon: ShieldCheck,
    },
  ];

  const policies = [
    {
      name: t("legal.privacy"),
      href: "/legal/privacidad",
      icon: FileText,
    },
    {
      name: t("legal.terms"),
      href: "/legal/terminos",
      icon: ReceiptText,
    },
    {
      name: t("legal.refunds"),
      href: "/legal/reembolsos",
      icon: BadgeDollarSign,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-neutral-900 bg-black text-white">
      {/* iOS Glow Backdrop Subtle Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-100px] top-[-100px] h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* About */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 shadow-sm backdrop-blur-md">
              <Rocket className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">
                {t("about.badge")}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-300">
              {t("about.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              {t("titles.navigation")}
            </h3>

            <ul className="space-y-2.5">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 rounded-2xl border border-neutral-900 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-zinc-200 transition-all duration-300 hover:border-emerald-500/40 hover:bg-neutral-900 hover:text-white"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-emerald-400 shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4 text-emerald-400" />
                      </div>

                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              {t("titles.services")}
            </h3>

            <ul className="space-y-2.5">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="group flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              {t("titles.legal")}
            </h3>

            <ul className="space-y-2.5">
              {policies.map((policy) => {
                const Icon = policy.icon;

                return (
                  <li key={policy.name}>
                    <Link
                      href={policy.href}
                      className="group flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                      <span>{policy.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-8 border-t border-neutral-900 pt-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Contact */}
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                {t("titles.contact")}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-zinc-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p>{t("contact.address")}</p>
              </div>

              <a
                href="tel:+5215519458234"
                className="group inline-flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:rotate-12" />
                +52 1 551945 8234
              </a>
            </div>
          </div>

          {/* Payments */}
          <div className="flex items-center gap-4 lg:justify-end">
            <div className="rounded-2xl border border-neutral-800 bg-white/95 p-2 shadow-lg backdrop-blur">
              <Image
                src="/cards.png"
                alt={t("paymentsAlt")}
                width={120}
                height={30}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-900 bg-neutral-950 px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center md:flex-row">
          <p className="text-xs text-zinc-400">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Mail,
  Phone,
  Menu,
  ChevronDown,
  ChevronRight,
  Globe,
  ShoppingCart,
  Sparkles,
  CircuitBoard,
  Rocket,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useServices } from "@/hooks/useServices";

type ServiceItem = {
  slug: string;
  titulo: string;
};

export default function Header() {
  const t = useTranslations("header");
  const { services } = useServices();

  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { itemCount } = useCart();

  const typedServices = services as ServiceItem[];

  return (
    <header className="sm:fixed top-0 z-50 w-full  text-slate-800 transition-all duration-300">
      {/* Top bar - Mobile view context */}
      <div className=" bg-slate-50/80 px-4 py-1.5 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs font-medium text-slate-600">
          <a
            href="mailto:atencion@vultra.com.mx"
            className="flex items-center gap-2 rounded-full px-2.5 py-1 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
          >
            <Mail className="h-3.5 w-3.5 text-emerald-500" />
            <span className="font-sans">atencion@vultra.com.mx</span>
          </a>

          <a
            href="tel:+5215519458234"
            className="flex items-center gap-2 rounded-full px-2.5 py-1 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
          >
            <Phone className="h-3.5 w-3.5 text-violet-600" />
            <span className="font-sans">+52 1 551945 8234</span>
          </a>
        </div>
      </div>

      {/* Main Floating Nav Container (iOS style) */}
      <div className="mx-auto px-6 py-2.5">
        <nav className="rounded-2xl  bg-white/90 backdrop-blur-2xl px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 pl-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full  p-0.5 transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={t("logoAlt")}
                  width={24}
                  height={24}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            <div className="leading-tight">
              <Image
                src="/title.png"
                alt={t("titleAlt")}
                width={150}
                height={35}
                className="h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-violet-600"
            >
              <Rocket className="h-4 w-4 text-emerald-500" />
              {t("nav.home")}
            </Link>

            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-violet-600"
            >
              <Sparkles className="h-4 w-4 text-violet-600" />
              {t("nav.about")}
            </Link>

            {/* Dropdown Services */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
              >
                <CircuitBoard className="h-4 w-4 text-emerald-500" />
                {t("nav.services")}
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${isServicesOpen ? "rotate-180 text-violet-600" : ""
                    }`}
                />
              </button>

              {/* Invisible bridge for hover stability */}
              <div className="absolute left-0 top-full h-2 w-full" />

              <div
                className={`absolute left-0 top-[calc(100%+8px)] z-50 w-80 transition-all duration-200 ${isServicesOpen
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-2"
                  }`}
              >
                <div className="overflow-hidden rounded-3xl  bg-white/95 p-2 shadow-2xl shadow-violet-950/10 backdrop-blur-2xl">
                  {/* Header box */}
                  <div className="mb-2 rounded-2xl bg-gradient-to-r from-violet-50 to-emerald-50/60 p-3.5 border border-slate-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-violet-700">
                      <CircuitBoard className="h-3.5 w-3.5 text-emerald-500" />
                      {t("services.title")}
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {t("services.description")}
                    </p>
                  </div>

                  {/* Services List */}
                  <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
                    {typedServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/servicios/${service.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm text-slate-700 transition-all duration-150 hover:bg-slate-100/80 hover:text-violet-600"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50 text-violet-600 transition-colors duration-150 group-hover:bg-emerald-500 group-hover:text-white">
                            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                          </span>
                          <span className="font-medium">{service.titulo}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-violet-600"
            >
              <Globe className="h-4 w-4 text-emerald-500" />
              {t("nav.contact")}
            </Link>

            <Link
              href="/carrito"
              className="relative inline-flex items-center justify-center rounded-full p-2.5 text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-violet-600"
              aria-label={t("cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Action Buttons Group (Mail, Phone & Packages CTA) */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="mailto:atencion@vultra.com.mx"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 active:scale-95"
              title="atencion@vultra.com.mx"
            >
              <Mail className="h-4 w-4 text-emerald-500" />
            </a>

            <a
              href="tel:+5215519458234"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 active:scale-95"
              title="+52 1 551945 8234"
            >
              <Phone className="h-4 w-4 text-violet-600" />
            </a>

            <Link href="/paquetes">
              <Button className="h-9 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-5 text-xs font-semibold text-white shadow-md shadow-violet-500/15 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95">
                {t("packages")}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/carrito"
              className="relative inline-flex items-center rounded-full p-2 text-slate-700 hover:bg-slate-100"
              aria-label={t("cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("openMenu")}
                  className="rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-violet-600"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full border-l border-slate-200 bg-white/95 text-slate-800 backdrop-blur-2xl sm:max-w-sm"
              >
                <div className="mt-8 flex flex-col gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-full px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <Rocket className="h-5 w-5 text-emerald-500" />
                    {t("nav.home")}
                  </Link>

                  <Link
                    href="/nosotros"
                    className="flex items-center gap-3 rounded-full px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="h-5 w-5 text-violet-600" />
                    {t("nav.about")}
                  </Link>

                  <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-4">
                    <Link
                      href="/servicios"
                      className="mb-3 flex items-center gap-2 font-semibold text-violet-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <CircuitBoard className="h-5 w-5 text-emerald-500" />
                      {t("nav.services")}
                    </Link>

                    <div className="space-y-1">
                      {typedServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          className="flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-white hover:text-violet-600"
                          onClick={() => setIsOpen(false)}
                        >
                          <ChevronRight className="h-4 w-4 text-emerald-500" />
                          {service.titulo}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contacto"
                    className="flex items-center gap-3 rounded-full px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-violet-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <Globe className="h-5 w-5 text-emerald-500" />
                    {t("nav.contact")}
                  </Link>

                  <Link href="/paquetes" onClick={() => setIsOpen(false)}>
                    <Button className="mt-2 w-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 font-semibold text-white shadow-md shadow-violet-500/10">
                      {t("packages")}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
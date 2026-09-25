"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ShoppingCart,
  House,
  Store,
  Users,
  Mail,
  Languages,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLocaleContext } from "@/context/LangContext";

export function Logo({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("header");

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="bg-white border border-[#E9D5FF] rounded-2xl p-2 shadow-sm">
        <Image
          src="/logo.png"
          width={46}
          height={46}
          alt={t("logoAlt")}
        />
      </div>

      <div className="hidden sm:block">
        <Image
          src="/title.png"
          width={180}
          height={45}
          alt={t("titleAlt")}
        />
      </div>
    </Link>
  );
}

export default function Header() {
  const t = useTranslations("header");
  const { locale, switchLanguage } = useLocaleContext()

  const { itemCount } = useCart();

  const nextLang = locale === "es" ? "en" : "es";



  const navItems = [
    {
      label: t("nav.home"),
      href: "/",
      icon: House,
    },
    {
      label: t("nav.about"),
      href: "/nosotros",
      icon: Users,
    },
    {
      label: t("nav.store"),
      href: "/tienda",
      icon: Store,
    },
    {
      label: t("nav.contact"),
      href: "/contacto",
      icon: Mail,
    },
  ];

  return (
    <>
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#F3E8FF] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={() => switchLanguage(nextLang)}
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  h-11
                  px-4
                  rounded-2xl
                  border
                  border-[#E9D5FF]
                  bg-[#FAF5FF]
                  text-[#7E22CE]
                  hover:bg-[#F3E8FF]
                  transition-all
                  duration-200
                "
              >
                <Languages className="w-4 h-4" />

                <span className="text-sm font-semibold">
                  {locale === "es"
                    ? "Español"
                    : "English"}
                </span>
              </button>

              {/* Cart */}
              <Link
                href="/carrito"
                aria-label={t("cart")}
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  rounded-2xl
                  border
                  border-[#E9D5FF]
                  bg-[#FAF5FF]
                  text-[#7E22CE]
                  hover:bg-[#F3E8FF]
                  transition-all
                  duration-200
                "
              >
                <ShoppingCart className="w-5 h-5" />

                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-[#EC4899]
                    text-white
                    text-[11px]
                    font-bold
                    rounded-full
                    min-w-[20px]
                    h-5
                    px-1
                    flex
                    items-center
                    justify-center
                  "
                >
                  {itemCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* FIXED BOTTOM NAVBAR */}
      <div
        className="
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          z-50
          w-[95%]
          max-w-4xl
          px-2
        "
      >
        <nav
          className="
            flex
            items-center
            justify-between
            gap-2
            bg-white
            border
            border-[#F3E8FF]
            rounded-3xl
            p-2
            shadow-xl
          "
        >
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="
                  group
                  flex
                  flex-1
                  flex-col
                  md:flex-row
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-3
                  rounded-2xl
                  text-sm
                  font-medium
                  text-[#6B21A8]
                  hover:bg-[#FDF2F8]
                  transition-all
                  duration-200
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    rounded-xl
                    bg-[#FAF5FF]
                    border
                    border-[#F3E8FF]
                    group-hover:bg-[#FCE7F3]
                    transition-all
                    duration-200
                  "
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-xs md:text-sm">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Mobile Language Switcher */}
          <button
            onClick={() => switchLanguage(nextLang)}
            className="
              sm:hidden
              flex
              flex-col
              items-center
              justify-center
              gap-2
              px-4
              py-3
              rounded-2xl
              text-[#6B21A8]
              hover:bg-[#FDF2F8]
              transition-all
              duration-200
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-[#FAF5FF]
                border
                border-[#F3E8FF]
              "
            >
              <Languages className="w-5 h-5" />
            </div>

            <span className="text-[11px] font-medium">
              {locale === "es" ? "ES" : "EN"}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
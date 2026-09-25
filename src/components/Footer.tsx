"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import {
  MapPin,
  Phone,
  Mail,
  CreditCard,
  FileText,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { Logo } from "./Header";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden border-t border-[#F3E5E8] bg-white pt-20 pb-10">
      {/* Background Elements */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#FAF5FF] opacity-80" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#FCE7F3] opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Line */}
        <div className="mb-14">
          <div className="h-[6px] w-full rounded-full bg-[#E9D5FF]" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-8">
            <div
              className="
                rounded-[2rem]
                border
                border-[#F3E8FF]
                bg-white
                px-6
                py-4
                shadow-sm
              "
            >
              <Logo />
            </div>
          </div>

          <h3 className="font-poppins text-3xl md:text-5xl font-bold tracking-tight text-[#4B3A42]">
            {t("title")}
          </h3>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mb-14">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-[#F3E5E8]
              bg-[#FFF8FA]
              p-8
              shadow-sm
            "
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.08),transparent_55%)]" />

            <div className="relative flex items-center gap-4 mb-7">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#E9D5FF]
                  bg-white
                "
              >
                <MapPin className="h-6 w-6 text-[#A855F7]" />
              </div>

              <h4 className="text-xl font-semibold text-[#4B3A42]">
                {t("address.title")}
              </h4>
            </div>

            <div className="relative space-y-3 text-[#6E5B63] leading-relaxed">
              <p>{t("address.line1")}</p>
              <p>{t("address.line2")}</p>
              <p>{t("address.line3")}</p>
              <p>{t("address.line4")}</p>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-[#F3E5E8]
              bg-white
              p-8
              shadow-sm
            "
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.08),transparent_55%)]" />

            <div className="relative flex items-center gap-4 mb-7">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#FCE7F3]
                  bg-[#FFF8FA]
                "
              >
                <Phone className="h-5 w-5 text-[#EC4899]" />
              </div>

              <h4 className="text-xl font-semibold text-[#4B3A42]">
                {t("support.title")}
              </h4>
            </div>

            <div className="relative space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#FAF5FF]
                    border
                    border-[#E9D5FF]
                  "
                >
                  <Phone className="h-4 w-4 text-[#A855F7]" />
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#8A7680]">
                    {t("support.phone")}
                  </p>

                  <a
                    href="tel:+5215525836217"
                    className="
                      font-medium
                      text-[#4B3A42]
                      transition-colors
                      hover:text-[#A855F7]
                    "
                  >
                    +52 1 55 2583 6217
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#FFF8FA]
                    border
                    border-[#FCE7F3]
                  "
                >
                  <Mail className="h-4 w-4 text-[#EC4899]" />
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#8A7680]">
                    {t("support.email")}
                  </p>

                  <a
                    href="mailto:hello@medionmx.com"
                    className="
                      font-medium
                      underline
                      underline-offset-4
                      text-[#4B3A42]
                      transition-colors
                      hover:text-[#EC4899]
                    "
                  >
                    hello@medionmx.com
                  </a>
                </div>
              </div>

              <div
                className="
                  rounded-[1.5rem]
                  border
                  border-[#F3E8FF]
                  bg-[#FAF5FF]
                  p-5
                  text-sm
                  leading-relaxed
                  text-[#6E5B63]
                "
              >
                {t("support.description")}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payments */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="
            relative
            overflow-hidden
            max-w-4xl
            mx-auto
            rounded-[2.5rem]
            border
            border-[#F3E5E8]
            bg-[#FFF8FA]
            p-10
            shadow-sm
            mb-14
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_60%)]" />

          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#E9D5FF]
                  bg-white
                "
              >
                <CreditCard className="h-5 w-5 text-[#A855F7]" />
              </div>

              <h4 className="text-2xl font-semibold text-[#4B3A42]">
                {t("payments.title")}
              </h4>
            </div>

            <div className="flex justify-center gap-5 flex-wrap">
              <motion.div
                whileHover={{ y: -4 }}
                className="
                  rounded-[1.5rem]
                  border
                  border-[#F3E5E8]
                  bg-white
                  px-7
                  py-5
                  shadow-sm
                "
              >
                <Image
                  src="/mastercard.png"
                  alt="Mastercard"
                  width={70}
                  height={45}
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="
                  rounded-[1.5rem]
                  border
                  border-[#F3E5E8]
                  bg-white
                  px-7
                  py-5
                  shadow-sm
                "
              >
                <Image
                  src="/visa.png"
                  alt="Visa"
                  width={70}
                  height={45}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Legal */}
        <div className="grid gap-4 max-w-5xl mx-auto mb-12 md:grid-cols-3">
          <Link
            href="/legal/terminos"
            className="
              group
              flex
              items-center
              gap-4
              rounded-[1.8rem]
              border
              border-[#F3E5E8]
              bg-white
              px-6
              py-5
              text-[#4B3A42]
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:bg-[#FAF5FF]
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-[#E9D5FF]
                bg-[#FAF5FF]
              "
            >
              <FileText className="h-5 w-5 text-[#A855F7]" />
            </div>

            <span className="text-sm font-medium">
              {t("legal.terms")}
            </span>
          </Link>

          <Link
            href="/legal/privacidad"
            className="
              group
              flex
              items-center
              gap-4
              rounded-[1.8rem]
              border
              border-[#F3E5E8]
              bg-white
              px-6
              py-5
              text-[#4B3A42]
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:bg-[#FFF8FA]
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-[#FCE7F3]
                bg-[#FFF8FA]
              "
            >
              <ShieldCheck className="h-5 w-5 text-[#EC4899]" />
            </div>

            <span className="text-sm font-medium">
              {t("legal.privacy")}
            </span>
          </Link>

          <Link
            href="/legal/reembolsos"
            className="
              group
              flex
              items-center
              gap-4
              rounded-[1.8rem]
              border
              border-[#F3E5E8]
              bg-white
              px-6
              py-5
              text-[#4B3A42]
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:bg-[#FAF5FF]
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-[#E9D5FF]
                bg-[#FAF5FF]
              "
            >
              <RotateCcw className="h-5 w-5 text-[#A855F7]" />
            </div>

            <span className="text-sm font-medium">
              {t("legal.returns")}
            </span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#F3E5E8] pt-8">
          <p className="text-center text-sm text-[#7B6870]">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSection";

export default function NosotrosPage() {
  const t = useTranslations("about");

  return (
    <main className="min-h-screen bg-[#fffefe] overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative pt-20 pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] rounded-full bg-[#FCE7F3] blur-3xl opacity-70" />

          <div className="absolute bottom-[-120px] right-[-120px] w-[340px] h-[340px] rounded-full bg-[#E9D5FF] blur-3xl opacity-70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center">
            {/* CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F5D0FE] bg-white px-5 py-2.5 shadow-sm mb-8">
                <Sparkles className="w-4 h-4 text-[#C026D3]" />

                <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#7E22CE]">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="font-poppins text-5xl md:text-6xl xl:text-7xl font-black leading-[1.02] text-[#2E1065] mb-8">
                {t("hero.title")}
              </h1>

              <div className="space-y-6 max-w-2xl">
                <p className="text-lg md:text-xl leading-relaxed text-[#6B4D7A]">
                  {t("hero.description1")}
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-[#6B4D7A]">
                  {t("hero.description2")}
                </p>
              </div>

              <div className="pt-10">
                <Link href="/tienda">
                  <Button className="h-14 px-8 rounded-2xl bg-[#C026D3] hover:bg-[#A21CAF] text-white text-sm font-semibold shadow-lg shadow-fuchsia-200/40 transition-all duration-300 hover:scale-[1.02]">
                    {t("hero.button")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#FDF4FF] rounded-[40px] rotate-3" />

              <div className="relative overflow-hidden rounded-[36px] border border-[#F5D0FE] bg-white p-3 shadow-2xl shadow-fuchsia-100">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1681967035389-84aabd80cb1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={t("images.medicalProfessionalAlt")}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white border border-[#F5D0FE] rounded-3xl px-5 py-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAE8FF] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#A21CAF]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#2E1065]">
                      {t("whyChooseUs.title")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-[.9fr_1.1fr] gap-10 items-stretch">
            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-[36px] border border-[#F5D0FE] bg-white shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1640876777012-bdb00a6323e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("images.medicalProfessionalAlt")}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1065]/40 via-transparent to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="relative overflow-hidden rounded-[36px] border border-[#F5D0FE] bg-white p-8 md:p-12 shadow-xl">
              <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[#FAE8FF] blur-3xl opacity-60" />

              <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-[#FAE8FF] border border-[#F5D0FE] flex items-center justify-center mb-8">
                  <HeartHandshake className="w-7 h-7 text-[#A21CAF]" />
                </div>

                <h2 className="font-poppins text-4xl md:text-5xl font-black leading-tight text-[#2E1065] mb-8">
                  {t("whyChooseUs.title")}
                </h2>

                <div className="space-y-6">
                  <p className="text-[#6B4D7A] leading-relaxed text-lg">
                    {t("whyChooseUs.description1")}
                  </p>

                  <p className="text-[#6B4D7A] leading-relaxed text-lg">
                    {t("whyChooseUs.description2")}
                  </p>

                  <p className="text-[#6B4D7A] leading-relaxed text-lg">
                    {t("whyChooseUs.description3")}
                  </p>
                </div>

                <div className="pt-10">
                  <Button className="h-14 px-8 rounded-2xl bg-[#7E22CE] hover:bg-[#6B21A8] text-white font-semibold">
                    {t("whyChooseUs.button")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC PARTNER */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[40px] border border-[#E9D5FF] bg-[#FAF5FF] overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* CONTENT */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="w-16 h-16 rounded-3xl bg-white border border-[#E9D5FF] flex items-center justify-center mb-8 shadow-sm">
                  <BadgeCheck className="w-7 h-7 text-[#9333EA]" />
                </div>

                <h2 className="font-poppins text-4xl md:text-5xl font-black text-[#2E1065] leading-tight mb-8">
                  {t("strategicPartner.title")}
                </h2>

                <div className="space-y-5">
                  <p className="text-lg leading-relaxed text-[#6B4D7A]">
                    {t("strategicPartner.description1")}
                  </p>

                  <p className="text-lg leading-relaxed text-[#6B4D7A]">
                    {t("strategicPartner.description2")}
                  </p>

                  <p className="text-lg leading-relaxed text-[#6B4D7A]">
                    {t("strategicPartner.description3")}
                  </p>

                  <p className="text-lg leading-relaxed text-[#6B4D7A]">
                    {t("strategicPartner.description4")}
                  </p>

                  <p className="text-lg leading-relaxed text-[#6B4D7A]">
                    {t("strategicPartner.description5")}
                  </p>
                </div>

                <div className="pt-10">
                  <Button className="h-14 px-8 rounded-2xl bg-[#C026D3] hover:bg-[#A21CAF] text-white font-semibold">
                    {t("strategicPartner.button")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* IMAGE */}
              <div className="relative min-h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1740953448394-86122e98c1be?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={t("images.medicalProfessionalAlt")}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* RESULTS */}
      <section className="py-24 bg-[#FFF7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_.9fr] gap-10 items-center">
            {/* CONTENT */}
            <div className="bg-white border border-[#F5D0FE] rounded-[36px] p-8 md:p-12 shadow-xl">
              <h2 className="font-poppins text-4xl md:text-5xl font-black text-[#2E1065] leading-tight mb-8">
                {t("results.title")}
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-lg text-[#6B4D7A] leading-relaxed">
                  {t("results.description1")}
                </p>

                <p className="text-lg text-[#6B4D7A] leading-relaxed">
                  {t("results.description2")}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#C026D3] mt-2.5 shrink-0" />

                  <span className="text-[#6B4D7A] leading-relaxed">
                    {t("results.items.item1")}
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#9333EA] mt-2.5 shrink-0" />

                  <span className="text-[#6B4D7A] leading-relaxed">
                    {t("results.items.item2")}
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#C026D3] mt-2.5 shrink-0" />

                  <span className="text-[#6B4D7A] leading-relaxed">
                    {t("results.items.item3")}
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#9333EA] mt-2.5 shrink-0" />

                  <span className="text-[#6B4D7A] leading-relaxed">
                    {t("results.items.item4")}
                  </span>
                </li>
              </ul>

              <p className="text-lg text-[#6B4D7A] leading-relaxed mb-10">
                {t("results.description3")}
              </p>

              <Button className="h-14 px-8 rounded-2xl bg-[#7E22CE] hover:bg-[#6B21A8] text-white font-semibold">
                {t("results.button")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* IMAGE */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[40px] bg-[#F3E8FF] rotate-3" />

              <div className="relative overflow-hidden rounded-[36px] border border-[#E9D5FF] bg-white p-3 shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                  <Image
                    src="https://images.unsplash.com/photo-1640876777012-bdb00a6323e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={t("images.medicalProfessionalAlt")}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[40px] border border-[#F5D0FE] bg-white p-8 md:p-14 shadow-2xl text-center">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#FAE8FF] blur-3xl opacity-60" />

            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#F3E8FF] blur-3xl opacity-60" />

            <div className="relative">
              <h2 className="font-poppins text-4xl md:text-5xl font-black text-[#2E1065] mb-6">
                {t("contact.title")}
              </h2>

              <div className="space-y-5 max-w-3xl mx-auto">
                <p className="text-lg leading-relaxed text-[#6B4D7A]">
                  {t("contact.description1")}
                </p>

                <p className="text-lg leading-relaxed text-[#6B4D7A]">
                  {t("contact.phone")}
                </p>

                <p className="text-lg leading-relaxed text-[#6B4D7A]">
                  {t("contact.description2")}
                </p>
              </div>

              <div className="pt-10">
                <Link href={"/contacto"}>
                  <Button className="h-14 px-8 rounded-2xl bg-[#C026D3] hover:bg-[#A21CAF] text-white font-semibold">
                    {t("contact.button")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
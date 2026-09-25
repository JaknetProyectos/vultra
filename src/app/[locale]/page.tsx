"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Header, { Logo } from "@/components/Header";
import Footer from "@/components/Footer";

import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";

import { FeaturesSection } from "@/components/FeaturesSection";

function SectionTitle({
  title,
  description,
  centered = true,
}: {
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <h2 className="font-poppins text-3xl md:text-5xl font-bold text-[#4B3A42] tracking-tight">
        {title}
      </h2>

      <p
        className={`mt-4 text-[#6E5B63] leading-relaxed ${
          centered ? "max-w-2xl mx-auto" : "max-w-xl"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-white pt-8 md:pt-14 pb-16 md:pb-24 border-b border-[#F3E5E8]">
      <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-[#FAF5FF] opacity-90" />
      <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-[#FCE7F3] opacity-80" />
      <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#F3E8FF] opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-6 order-2 lg:order-1"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9D5FF] bg-[#FAF5FF] px-4 py-2 text-sm font-medium text-[#7E22CE] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#EC4899]" />
              <span className="h-2 w-2 rounded-full bg-[#A855F7]" />
              <span>{t("title")}</span>
            </div>

            <h1 className="mt-8 max-w-2xl font-poppins text-4xl font-bold leading-tight tracking-tight text-[#4B3A42] md:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6E5B63] md:text-xl">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-6 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          >
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#FAF5FF] border border-[#F3E8FF]" />
              <div className="absolute -right-6 top-10 h-24 w-24 rounded-full bg-[#FCE7F3] opacity-90" />
              <div className="absolute -left-4 bottom-8 h-16 w-16 rounded-full bg-[#E9D5FF] opacity-80" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[#F3E5E8] bg-white shadow-[0_20px_60px_rgba(168,85,247,0.12)]">
                <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="flex items-center justify-center bg-[#FFF8FA] p-6 md:p-8">
                    <Image
                      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt={t("imageAlt")}
                      width={520}
                      height={620}
                      priority
                      className="h-full w-full rounded-[1.5rem] border border-[#F3E5E8] object-cover"
                    />
                  </div>

                  <div className="hidden md:flex flex-col justify-between bg-[#FAF5FF] p-8">
                    <div className="space-y-4">
                      <div className="h-3 w-24 rounded-full bg-[#FCE7F3]" />
                      <div className="h-3 w-36 rounded-full bg-[#E9D5FF]" />
                      <div className="h-3 w-28 rounded-full bg-[#FCE7F3]" />
                    </div>

                    <div className="rounded-[1.5rem] border border-[#F3E8FF] bg-white p-5 shadow-sm">
                      <div className="h-2 w-20 rounded-full bg-[#EC4899]" />
                      <div className="mt-4 h-24 rounded-[1rem] bg-[#FFF8FA]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const t = useTranslations("home.products");
  const locale = useLocale();

  const [currentSlide, setCurrentSlide] = useState(0);

  const { products, loading } = useProducts({
    featured: false,
    limit: 6,
  });

  const maxSlides = Math.max(1, products.length - 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const displayProducts = useMemo(() => {
    return loading ? [] : products;
  }, [loading, products]);

  return (
    <section className="relative py-16 md:py-24 bg-[#FFF8FA] overflow-hidden">
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#FAF5FF] opacity-70" />
      <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-[#FCE7F3] opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <SectionTitle title={t("title")} description={t("description")} />
        </motion.div>

        <div className="mt-12">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[2rem] border border-[#F3E5E8] bg-white p-6 shadow-sm animate-pulse"
                >
                  <div className="aspect-square rounded-[1.5rem] bg-[#F3E8FF] mb-4" />
                  <div className="h-4 bg-[#F3E8FF] rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-[#F3E5E8] bg-white shadow-[0_20px_60px_rgba(244,114,182,0.08)]">
                <div
                  className="flex transition-transform duration-500 ease-out will-change-transform"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / 3)}%)`,
                  }}
                >
                  {displayProducts.map((product) => (
                    <div
                      key={product.id}
                      className="min-w-full px-0 sm:min-w-[50%] lg:min-w-[33.333%] p-3 sm:p-4"
                    >
                      <Link href={`/tienda/${product.slug}`}>
                        <motion.div
                          whileHover={{ y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="group h-full rounded-[1.8rem] border border-[#F3E5E8] bg-[#FFFDFD] p-5 shadow-sm transition-all hover:shadow-[0_18px_40px_rgba(168,85,247,0.10)]"
                        >
                          <div className="relative mb-5 aspect-square overflow-hidden rounded-[1.4rem] border border-[#F3E8FF] bg-[#FAF5FF]">
                            <Image
                              src={product.image}
                              alt={
                                locale === "es"
                                  ? product.name
                                  : product.name_english || product.name
                              }
                              fill
                              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          <h3 className="text-center font-medium text-[#4B3A42] transition-colors group-hover:text-[#A855F7]">
                            {locale === "es"
                              ? product.name
                              : product.name_english || product.name}
                          </h3>
                        </motion.div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {displayProducts.length > 3 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[#F3E8FF] bg-white p-3 shadow-lg transition-all hover:bg-[#FAF5FF] hover:scale-105"
                  >
                    <ChevronLeft className="h-5 w-5 text-[#7E22CE]" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[#F3E8FF] bg-white p-3 shadow-lg transition-all hover:bg-[#FAF5FF] hover:scale-105"
                  >
                    <ChevronRight className="h-5 w-5 text-[#7E22CE]" />
                  </button>
                </>
              )}
            </div>
          )}

          {!loading && displayProducts.length > 3 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: maxSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    currentSlide === index
                      ? "w-8 bg-[#A855F7]"
                      : "w-2 bg-[#E9D5FF]"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link href="/tienda">
              <Button className="rounded-full bg-[#EC4899] px-8 py-6 font-medium text-white shadow-lg shadow-[#EC4899]/20 transition-all hover:bg-[#DB2777] hover:translate-y-[-1px]">
                {t("button")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentSection() {
  const t = useTranslations("home.payment");

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#FAF5FF] opacity-80" />
      <div className="absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-[#FCE7F3] opacity-80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1723514536306-26fe5c4adeb7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={t("imageAlt")}
              width={450}
              height={350}
              className="w-full rounded-[2rem] border border-[#F3E5E8] object-cover shadow-[0_20px_60px_rgba(168,85,247,0.08)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="order-1 md:order-2"
          >
            <div className="rounded-[2rem] border border-[#F3E5E8] bg-[#FFF8FA] p-8 md:p-10 shadow-sm">
              <SectionTitle
                title={t("title")}
                description={t("description")}
                centered={false}
              />

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contacto">
                  <Button className="rounded-full bg-[#A855F7] px-6 py-5 text-white transition-all hover:bg-[#9333EA] hover:translate-y-[-1px]">
                    {t("contactButton")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/pagar-personalizado">
                  <Button
                    variant="outline"
                    className="rounded-full border-[#E9D5FF] bg-white px-6 py-5 text-[#7E22CE] shadow-sm transition-all hover:bg-[#FAF5FF] hover:translate-y-[-1px]"
                  >
                    {t("payButton")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const t = useTranslations("home.contact");

  return (
    <section className="relative py-16 md:py-24 bg-[#FFF8FA] overflow-hidden">
      <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-[#FCE7F3] opacity-70" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#FAF5FF] opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="rounded-[2rem] border border-[#F3E5E8] bg-white p-8 md:p-10 shadow-sm">
              <SectionTitle
                title={t("title")}
                description={t("description")}
                centered={false}
              />

              <div className="mt-8 rounded-[1.6rem] border border-[#F3E8FF] bg-[#FAF5FF] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E9D5FF] bg-white">
                    <Phone className="h-5 w-5 text-[#EC4899]" />
                  </div>

                  <a
                    href="tel:+5215525836217"
                    className="font-semibold text-[#4B3A42]"
                  >
                    +52 1 55 2583 6217
                  </a>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#6E5B63]">
                  {t("phoneDescription")}
                </p>
              </div>

              <div className="mt-8">
                <Link href="/contacto">
                  <Button className="rounded-full bg-[#EC4899] px-8 py-6 text-white shadow-lg shadow-[#EC4899]/20 transition-all hover:bg-[#DB2777] hover:translate-y-[-1px]">
                    {t("button")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#F3E8FF]" />
              <Image
                src="https://plus.unsplash.com/premium_photo-1681967035389-84aabd80cb1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={t("imageAlt")}
                width={400}
                height={500}
                className="relative w-full rounded-[2rem] border border-[#F3E5E8] object-cover shadow-[0_20px_60px_rgba(236,72,153,0.10)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useCart();

  return (
    <main className="min-h-screen overflow-x-hidden bg-white pb-36 md:pb-32">
      <Header />
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <PaymentSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
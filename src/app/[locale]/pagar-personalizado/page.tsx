"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BadgeInfo,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function CustomProductPage() {
  const t = useTranslations("customPlan");

  const router = useRouter();
  const { addItem } = useCart();

  const [quoteNumber, setQuoteNumber] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const finalPrice = Number(totalPrice) || 0;

    if (!quoteNumber.trim()) {
      setError(t("errors.quoteRequired"));
      return;
    }

    if (finalPrice <= 0) {
      setError(t("errors.invalidAmount"));
      return;
    }

    setIsAdding(true);

    const folioUpper = quoteNumber.trim().toUpperCase();

    addItem(
      {
        category_slug: "custom",
        description: t("product.description", {
          quote: folioUpper,
        }),
        name: t("product.name", {
          quote: folioUpper,
        }),
        name_english: `Special Order - Quote #${folioUpper}`,
        price: finalPrice,
        slug: `custom-quote-${quoteNumber
          .trim()
          .toLowerCase()}`,
        description_english: `Medical supplies pre-agreed with the sales department under quote #${folioUpper}.`,
        featured: false,
        id: `custom-quote-${folioUpper}-${Date.now()}`,
        image: "/logo-default.png",
        isNew: false,
      },
      1
    );

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 1000);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FFFCFE] overflow-hidden pb-20">
        {/* HERO */}
        <section className="relative border-b border-[#F3E8FF] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-[-140px] left-[-120px] w-[340px] h-[340px] rounded-full bg-[#FCE7F3] blur-3xl opacity-70" />

            <div className="absolute bottom-[-160px] right-[-120px] w-[360px] h-[360px] rounded-full bg-[#E9D5FF] blur-3xl opacity-70" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F5D0FE] bg-white px-5 py-2.5 shadow-sm mb-7">
                <Sparkles className="w-4 h-4 text-[#A21CAF]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7E22CE]">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-[1.02] text-[#34124D] mb-6">
                {t("hero.title")}
              </h1>

              <p className="text-base md:text-lg leading-relaxed text-[#725A7E] max-w-2xl">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 z-10">
          <div className="grid xl:grid-cols-[.95fr_1.05fr] overflow-hidden rounded-[34px] border border-[#F3E8FF] bg-white shadow-[0_20px_60px_rgba(168,85,247,0.08)]">
            {/* LEFT SIDE */}
            <div className="relative bg-[#FAF5FF] border-b xl:border-b-0 xl:border-r border-[#F3E8FF] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FCE7F3] blur-3xl opacity-60" />

              <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                <div className="max-w-md w-full">
                  <div className="relative rounded-[30px] border border-[#E9D5FF] bg-white p-8 shadow-lg">
                    <div className="absolute inset-x-10 top-0 h-px bg-[#F5D0FE]" />

                    <div className="aspect-square rounded-[24px] bg-[#FFFCFE] border border-[#F3E8FF] flex items-center justify-center overflow-hidden">
                      <Image
                        src={"/logo-default.png"}
                        width={220}
                        height={220}
                        alt={t("imageAlt")}
                        className="object-contain hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="mt-8">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-[#9333EA]" />
                        </div>

                        <div>
                          <h2 className="text-lg font-bold text-[#34124D]">
                            {t("authorized.title")}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-[#725A7E]">
                        {t("authorized.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative overflow-hidden">
              <div className="absolute bottom-[-120px] right-[-120px] w-[260px] h-[260px] rounded-full bg-[#FCE7F3] blur-3xl opacity-60" />

              <div className="relative p-6 sm:p-10 md:p-14">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#F3E8FF] border border-[#E9D5FF] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#9333EA]" />
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-[#34124D]">
                      {t("hero.title")}
                    </h2>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {error && (
                    <div className="rounded-[22px] border border-[#FBCFE8] bg-[#FFF1F7] px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0">
                          <BadgeInfo className="w-4 h-4 text-[#DB2777]" />
                        </div>

                        <p className="text-sm font-semibold leading-relaxed text-[#BE185D]">
                          {error}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* QUOTE */}
                  <div className="space-y-3">
                    <label
                      htmlFor="quoteNumber"
                      className="text-xs font-black uppercase tracking-[0.2em] text-[#7E22CE] block"
                    >
                      {t("form.quoteLabel")}
                    </label>

                    <div className="relative">
                      <input
                        id="quoteNumber"
                        type="text"
                        required
                        placeholder={t(
                          "form.quotePlaceholder"
                        )}
                        value={quoteNumber}
                        onChange={(e) =>
                          setQuoteNumber(e.target.value)
                        }
                        className="
                          w-full
                          h-16
                          rounded-[22px]
                          border
                          border-[#E9D5FF]
                          bg-[#FFFCFE]
                          px-5
                          text-sm
                          font-semibold
                          tracking-[0.08em]
                          uppercase
                          text-[#34124D]
                          outline-none
                          transition-all
                          duration-300
                          focus:border-[#C084FC]
                          focus:bg-white
                          focus:shadow-[0_0_0_6px_rgba(233,213,255,0.6)]
                        "
                      />

                      <div className="absolute inset-y-0 right-5 flex items-center">
                        <div className="w-9 h-9 rounded-xl bg-[#FAF5FF] flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#9333EA]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="space-y-3">
                    <label
                      htmlFor="totalPrice"
                      className="text-xs font-black uppercase tracking-[0.2em] text-[#7E22CE] block"
                    >
                      {t("form.amountLabel")}
                    </label>

                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2">
                        <span className="text-lg font-black text-[#A21CAF]">
                          $
                        </span>
                      </div>

                      <input
                        id="totalPrice"
                        type="number"
                        required
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        value={totalPrice}
                        onChange={(e) =>
                          setTotalPrice(
                            e.target.value !== ""
                              ? Number(e.target.value)
                              : ""
                          )
                        }
                        className="
                          w-full
                          h-16
                          rounded-[22px]
                          border
                          border-[#E9D5FF]
                          bg-[#FFFCFE]
                          pl-10
                          pr-20
                          text-lg
                          font-black
                          text-[#34124D]
                          outline-none
                          transition-all
                          duration-300
                          focus:border-[#C084FC]
                          focus:bg-white
                          focus:shadow-[0_0_0_6px_rgba(233,213,255,0.6)]
                        "
                      />

                      <div className="absolute inset-y-0 right-5 flex items-center">
                        <span className="text-xs font-black tracking-[0.18em] text-[#8B5CF6]">
                          MXN
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* INFO BOX */}
                  <div className="rounded-[26px] border border-[#F5D0FE] bg-[#FFF7FB] p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#F5D0FE] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-[#C026D3]" />
                      </div>

                      <p className="text-sm leading-relaxed text-[#6F587A]">
                        {t("infoText.before")}
                        <strong className="text-[#34124D]">
                          {" "}
                          "
                          {t("product.name", {
                            quote:
                              quoteNumber
                                .trim()
                                .toUpperCase() || "...",
                          })}
                          "
                        </strong>
                        {t("infoText.after")}
                      </p>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    disabled={isAdding}
                    className={`
                      w-full
                      h-16
                      rounded-[22px]
                      text-sm
                      font-black
                      tracking-[0.08em]
                      uppercase
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                      gap-3
                      shadow-lg
                      ${
                        isAdding
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : "bg-[#A21CAF] hover:bg-[#86198F] text-white hover:scale-[1.01]"
                      }
                    `}
                  >
                    {isAdding ? (
                      t("buttons.adding")
                    ) : (
                      <>
                        {t("buttons.addToCart")}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
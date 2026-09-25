"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useLocale, useTranslations } from "next-intl";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

import { ProductFilters } from "@/types/product";

import Link from "next/link";

import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { formatPrice } from "@/lib/price";

export default function StorePage() {
  const t = useTranslations("store");
  const locale = useLocale();

  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 15,
    search: "",
    categorySlug: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    featured: undefined,
    isNew: undefined,
    sortBy: "name",
  });

  const [searchInput, setSearchInput] = useState("");

  const { categories, loading: loadingCategories } = useCategories();

  const { products, loading: loadingProducts, pagination } =
    useProducts(filters);

  useEffect(() => {
    setSearchInput(filters.search || "");
  }, [filters.search]);

  const handleFilterChange = (
    key: keyof ProductFilters,
    value: any
  ) => {
    setFilters((prev) => ({
      ...prev,
      page: key !== "page" ? 1 : value,
      [key]:
        value === "" || value === undefined
          ? undefined
          : value,
    }));
  };

  const handleSearchSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    handleFilterChange("search", searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");

    setFilters({
      page: 1,
      limit: 15,
      search: "",
      categorySlug: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      featured: undefined,
      isNew: undefined,
      sortBy: "name",
    });
  };

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-[#FCFAFF]">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[#F3E5E8] bg-white">
          {/* Background */}
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#FAF5FF]" />
          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-[#FFF1F7]" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="max-w-4xl"
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#E9D5FF]
                  bg-[#FAF5FF]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#7E22CE]
                  shadow-sm
                  mb-7
                "
              >
                <Sparkles className="h-4 w-4" />
                {t("hero.badge")}
              </div>

              <h1
                className="
                  text-4xl
                  md:text-6xl
                  font-black
                  tracking-tight
                  leading-[1.05]
                  text-[#4B3A42]
                  mb-6
                "
              >
                {t("hero.title")}
              </h1>

              <p
                className="
                  max-w-2xl
                  text-base
                  md:text-lg
                  leading-relaxed
                  text-[#6E5B63]
                "
              >
                {t("hero.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              {/* SIDEBAR */}
              <aside className="hidden lg:block">
                <div
                  className="
                    sticky
                    top-28
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-[#F3E5E8]
                    bg-white
                    shadow-sm
                  "
                >
                  {/* Header */}
                  <div
                    className="
                      border-b
                      border-[#F3E5E8]
                      bg-[#FAF5FF]
                      px-7
                      py-6
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
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
                          <SlidersHorizontal className="h-5 w-5 text-[#A855F7]" />
                        </div>

                        <div>
                          <h2 className="text-base font-bold text-[#4B3A42]">
                            {t("filters.title")}
                          </h2>

                          <p className="mt-1 text-xs text-[#8A7680]">
                            {t("filters.subtitle")}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleClearFilters}
                        className="
                          text-xs
                          font-bold
                          text-[#EC4899]
                          transition-colors
                          hover:text-[#DB2777]
                        "
                      >
                        {t("filters.clear")}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8 p-7">
                    {/* Categories */}
                    <div>
                      <h3
                        className="
                          mb-4
                          text-xs
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#8A7680]
                        "
                      >
                        {t("filters.categories")}
                      </h3>

                      {loadingCategories ? (
                        <div className="space-y-3 animate-pulse">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="h-11 rounded-xl bg-[#FAF5FF]"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() =>
                              handleFilterChange(
                                "categorySlug",
                                undefined
                              )
                            }
                            className={`
                              w-full
                              rounded-xl
                              border
                              px-4
                              py-3
                              text-left
                              text-sm
                              transition-all
                              ${
                                !filters.categorySlug
                                  ? "border-[#E9D5FF] bg-[#FAF5FF] font-semibold text-[#7E22CE]"
                                  : "border-[#F3E5E8] bg-white text-[#6E5B63] hover:bg-[#FCFAFF]"
                              }
                            `}
                          >
                            {t("filters.allCategories")}
                          </button>

                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() =>
                                handleFilterChange(
                                  "categorySlug",
                                  cat.slug
                                )
                              }
                              className={`
                                w-full
                                rounded-xl
                                border
                                px-4
                                py-3
                                text-left
                                text-sm
                                transition-all
                                ${
                                  filters.categorySlug === cat.slug
                                    ? "border-[#E9D5FF] bg-[#FAF5FF] font-semibold text-[#7E22CE]"
                                    : "border-[#F3E5E8] bg-white text-[#6E5B63] hover:bg-[#FCFAFF]"
                                }
                              `}
                            >
                              {locale === "es"
                                ? cat.name
                                : cat.name_english}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="border-t border-[#F3E5E8] pt-7">
                      <h3
                        className="
                          mb-4
                          text-xs
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#8A7680]
                        "
                      >
                        {t("filters.priceRange")}
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder={t("filters.min")}
                          value={filters.minPrice || ""}
                          onChange={(e) =>
                            handleFilterChange(
                              "minPrice",
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                          className="
                            h-12
                            rounded-xl
                            border
                            border-[#F3E5E8]
                            bg-[#FCFAFF]
                            px-4
                            text-sm
                            text-[#4B3A42]
                            outline-none
                            transition-all
                            placeholder:text-[#B7A4AA]
                            focus:border-[#D8B4FE]
                            focus:ring-4
                            focus:ring-[#E9D5FF]/50
                          "
                        />

                        <input
                          type="number"
                          placeholder={t("filters.max")}
                          value={filters.maxPrice || ""}
                          onChange={(e) =>
                            handleFilterChange(
                              "maxPrice",
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                          className="
                            h-12
                            rounded-xl
                            border
                            border-[#F3E5E8]
                            bg-[#FCFAFF]
                            px-4
                            text-sm
                            text-[#4B3A42]
                            outline-none
                            transition-all
                            placeholder:text-[#B7A4AA]
                            focus:border-[#D8B4FE]
                            focus:ring-4
                            focus:ring-[#E9D5FF]/50
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* MAIN */}
              <div className="mt-8 space-y-7 lg:col-span-3 lg:mt-0">
                {/* TOP BAR */}
                <div
                  className="
                    rounded-[2rem]
                    border
                    border-[#F3E5E8]
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    {/* Search */}
                    <form
                      onSubmit={handleSearchSubmit}
                      className="relative w-full xl:max-w-2xl"
                    >
                      <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B7A4AA]" />

                      <input
                        type="text"
                        placeholder={t("search.placeholder")}
                        value={searchInput}
                        onChange={(e) =>
                          setSearchInput(e.target.value)
                        }
                        className="
                          h-14
                          w-full
                          rounded-2xl
                          border
                          border-[#F3E5E8]
                          bg-[#FCFAFF]
                          pl-12
                          pr-32
                          text-sm
                          text-[#4B3A42]
                          outline-none
                          transition-all
                          placeholder:text-[#B7A4AA]
                          focus:border-[#D8B4FE]
                          focus:ring-4
                          focus:ring-[#E9D5FF]/50
                        "
                      />

                      <button
                        type="submit"
                        className="
                          absolute
                          right-2
                          top-2
                          bottom-2
                          rounded-xl
                          bg-[#A855F7]
                          px-6
                          text-sm
                          font-semibold
                          text-white
                          transition-all
                          hover:bg-[#9333EA]
                        "
                      >
                        {t("search.button")}
                      </button>
                    </form>

                    {/* Sort */}
                    <select
                      value={filters.sortBy || "name"}
                      onChange={(e) =>
                        handleFilterChange(
                          "sortBy",
                          e.target.value
                        )
                      }
                      className="
                        h-14
                        rounded-2xl
                        border
                        border-[#F3E5E8]
                        bg-[#FCFAFF]
                        px-5
                        text-sm
                        text-[#4B3A42]
                        outline-none
                        transition-all
                        focus:border-[#D8B4FE]
                        focus:ring-4
                        focus:ring-[#E9D5FF]/50
                      "
                    >
                      <option value="name">
                        {t("sort.name")}
                      </option>

                      <option value="price-asc">
                        {t("sort.priceAsc")}
                      </option>

                      <option value="price-desc">
                        {t("sort.priceDesc")}
                      </option>

                      <option value="newest">
                        {t("sort.newest")}
                      </option>
                    </select>
                  </div>
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#8A7680]">
                    {t("results.showing")}{" "}
                    <span className="font-bold text-[#4B3A42]">
                      {products.length}
                    </span>{" "}
                    {t("results.of")}{" "}
                    <span className="font-bold text-[#4B3A42]">
                      {pagination.total}
                    </span>{" "}
                    {t("results.products")}
                  </p>

                  {filters.categorySlug && (
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#E9D5FF]
                        bg-[#FAF5FF]
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-[#7E22CE]
                      "
                    >
                      <Star className="h-4 w-4" />

                      {filters.categorySlug.replace(/-/g, " ")}
                    </div>
                  )}
                </div>

                {/* PRODUCTS */}
                {loadingProducts ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="
                          overflow-hidden
                          rounded-[2rem]
                          border
                          border-[#F3E5E8]
                          bg-white
                          p-5
                          animate-pulse
                        "
                      >
                        <div className="aspect-square rounded-2xl bg-[#FAF5FF]" />

                        <div className="mt-5 h-4 rounded-full bg-[#FAF5FF]" />
                        <div className="mt-3 h-3 w-2/3 rounded-full bg-[#FAF5FF]" />

                        <div className="mt-6 h-12 rounded-2xl bg-[#FAF5FF]" />
                      </div>
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <div
                    className="
                      rounded-[2.5rem]
                      border
                      border-dashed
                      border-[#E9D5FF]
                      bg-white
                      px-6
                      py-20
                      text-center
                    "
                  >
                    <div
                      className="
                        mx-auto
                        mb-6
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-[#FAF5FF]
                      "
                    >
                      <Search className="h-8 w-8 text-[#C084FC]" />
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-[#4B3A42]">
                      {t("empty.title")}
                    </h3>

                    <p className="mx-auto mb-8 max-w-md text-[#8A7680]">
                      {t("empty.description")}
                    </p>

                    <button
                      onClick={handleClearFilters}
                      className="
                        rounded-2xl
                        bg-[#A855F7]
                        px-7
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        hover:bg-[#9333EA]
                      "
                    >
                      {t("empty.button")}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product, index) => (
                      <motion.article
                        key={product.id}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.04,
                        }}
                        className="
                          group
                          overflow-hidden
                          rounded-[2rem]
                          border
                          border-[#F3E5E8]
                          bg-white
                          shadow-sm
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-[0_20px_40px_rgba(168,85,247,0.10)]
                        "
                      >
                        {/* IMAGE */}
                        <div
                          className="
                            relative
                            aspect-square
                            overflow-hidden
                            border-b
                            border-[#F3E5E8]
                            bg-[#FCFAFF]
                          "
                        >
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="
                                h-full
                                w-full
                                object-contain
                                p-8
                                transition-transform
                                duration-500
                                group-hover:scale-105
                              "
                              loading="lazy"
                            />
                          ) : (
                            <div
                              className="
                                flex
                                h-full
                                items-center
                                justify-center
                                text-sm
                                text-[#B7A4AA]
                              "
                            >
                              {t("product.noImage")}
                            </div>
                          )}

                          <div className="absolute left-5 top-5 flex flex-col gap-2">
                            {product.isNew && (
                              <span
                                className="
                                  rounded-full
                                  bg-[#EC4899]
                                  px-3
                                  py-1
                                  text-[11px]
                                  font-bold
                                  text-white
                                "
                              >
                                {t("product.new")}
                              </span>
                            )}

                            {product.featured && (
                              <span
                                className="
                                  rounded-full
                                  border
                                  border-[#E9D5FF]
                                  bg-[#FAF5FF]
                                  px-3
                                  py-1
                                  text-[11px]
                                  font-bold
                                  text-[#7E22CE]
                                "
                              >
                                {t("product.featured")}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-6">
                            <Link
                              href={`/tienda/${product.slug}`}
                            >
                              <h3
                                className="
                                  text-xl
                                  font-bold
                                  leading-snug
                                  text-[#4B3A42]
                                  transition-colors
                                  group-hover:text-[#A855F7]
                                  line-clamp-2
                                "
                              >
                                {locale === "es"
                                  ? product.name
                                  : product.name_english}
                              </h3>
                            </Link>

                            <p
                              className="
                                mt-3
                                line-clamp-2
                                text-sm
                                leading-relaxed
                                text-[#8A7680]
                              "
                            >
                              {locale === "es"
                                ? product.description
                                : product.description_english}
                            </p>
                          </div>

                          <div
                            className="
                              mt-auto
                              flex
                              items-end
                              justify-between
                              gap-4
                              border-t
                              border-[#F3E5E8]
                              pt-5
                            "
                          >
                            <div>
                              <span className="mb-1 block text-xs text-[#B7A4AA]">
                                {t("product.price")}
                              </span>

                              <span className="text-2xl font-black text-[#4B3A42]">
                                {formatPrice(product.price)}
                                {t("tax")}
                              </span>
                            </div>

                            <Link
                              href={`/tienda/${product.slug}`}
                              className="
                                rounded-2xl
                                border
                                border-[#E9D5FF]
                                bg-[#FAF5FF]
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-[#7E22CE]
                                transition-all
                                hover:bg-[#A855F7]
                                hover:text-white
                              "
                            >
                              {t("product.viewDetail")}
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}

                {/* PAGINATION */}
                {!loadingProducts &&
                  pagination.totalPages > 1 && (
                    <div
                      className="
                        flex
                        flex-col
                        gap-5
                        rounded-[2rem]
                        border
                        border-[#F3E5E8]
                        bg-white
                        p-5
                        shadow-sm
                        md:flex-row
                        md:items-center
                        md:justify-between
                      "
                    >
                      <button
                        onClick={() =>
                          handleFilterChange(
                            "page",
                            Math.max(
                              pagination.page - 1,
                              1
                            )
                          )
                        }
                        disabled={pagination.page === 1}
                        className="
                          flex
                          h-12
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          border
                          border-[#F3E5E8]
                          bg-[#FCFAFF]
                          px-5
                          text-sm
                          font-semibold
                          text-[#4B3A42]
                          transition-all
                          hover:bg-[#FAF5FF]
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <ChevronLeft className="h-4 w-4" />
                        {t("pagination.previous")}
                      </button>

                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {Array.from(
                          {
                            length:
                              pagination.totalPages,
                          },
                          (_, index) => {
                            const pageNum =
                              index + 1;

                            return (
                              <button
                                key={pageNum}
                                onClick={() =>
                                  handleFilterChange(
                                    "page",
                                    pageNum
                                  )
                                }
                                className={`
                                  h-12
                                  w-12
                                  rounded-2xl
                                  text-sm
                                  font-bold
                                  transition-all
                                  ${
                                    pagination.page ===
                                    pageNum
                                      ? "bg-[#A855F7] text-white shadow-lg shadow-[#A855F7]/20"
                                      : "border border-[#F3E5E8] bg-[#FCFAFF] text-[#6E5B63] hover:bg-[#FAF5FF]"
                                  }
                                `}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() =>
                          handleFilterChange(
                            "page",
                            Math.min(
                              pagination.page + 1,
                              pagination.totalPages
                            )
                          )
                        }
                        disabled={
                          pagination.page ===
                          pagination.totalPages
                        }
                        className="
                          flex
                          h-12
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          border
                          border-[#F3E5E8]
                          bg-[#FCFAFF]
                          px-5
                          text-sm
                          font-semibold
                          text-[#4B3A42]
                          transition-all
                          hover:bg-[#FAF5FF]
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        {t("pagination.next")}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
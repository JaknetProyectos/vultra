'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  ShoppingCart,
  Check,
  Minus,
  Plus,
  Package,
  ArrowRight,
} from 'lucide-react';

import { useProducts } from '@/hooks/useProducts';
import { useProduct } from '@/hooks/useProduct';
import { useCart } from '@/context/CartContext';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { formatPrice } from '@/lib/price';

export default function ProductDetailPage() {
  const t = useTranslations('productDetail');

  const params = useParams();
  const router = useRouter();

  const slugOrId = params?.slug as string;

  const [quantity, setQuantity] = useState<number>(1);
  const language = useLocale();

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const { product, loading, error } = useProduct(slugOrId);

  const { products: relatedProducts, loading: loadingRelated } =
    useProducts({
      categorySlug: product?.category_slug || undefined,
      limit: 5,
    });

  const { addItem, getItemQuantity } = useCart();

  const currentInCartCount = product
    ? getItemQuantity(product.id)
    : 0;

  const cleanRelatedProducts = useMemo(() => {
    return relatedProducts
      .filter((item) => item.id !== product?.id)
      .slice(0, 4);
  }, [relatedProducts, product]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    setIsAdding(true);

    addItem(product, quantity);

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

  if (loading) {
    return (
      <>
        <Header />

        <div className="min-h-screen bg-[#FCF7FF] flex items-center justify-center px-6">
          <div className="w-full max-w-lg bg-white border border-[#E9D5FF] rounded-[24px] p-12 shadow-[0_10px_40px_rgba(168,85,247,0.08)] text-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#C084FC] border-t-transparent animate-spin mx-auto mb-6" />

            <h2 className="text-2xl font-black text-[#2E1065] mb-3">
              {t('loadingTitle')}
            </h2>

            <p className="text-[#7E7290] leading-relaxed">
              {t('loadingDescription')}
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />

        <div className="min-h-screen bg-[#FCF7FF] flex items-center justify-center px-6 py-24">
          <div className="w-full max-w-lg bg-white border border-[#F5D0FE] rounded-[24px] p-10 shadow-[0_10px_40px_rgba(236,72,153,0.08)] text-center">
            <div className="w-20 h-20 rounded-[22px] bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center mx-auto mb-6">
              <Package className="w-9 h-9 text-[#A855F7]" />
            </div>

            <h2 className="text-3xl font-black text-[#2E1065] mb-4">
              {t('notFoundTitle')}
            </h2>

            <p className="text-[#7E7290] leading-relaxed mb-8">
              {t('notFoundDescription')}
            </p>

            <button
              onClick={() => router.push('/tienda')}
              className="
                w-full
                h-14
                rounded-[18px]
                bg-[#A855F7]
                hover:bg-[#9333EA]
                text-white
                font-semibold
                transition-all
                duration-300
              "
            >
              {t('backToStore')}
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FCF7FF] pb-24">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[#F3E8FF] bg-white">
          <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-[#FCE7F3] rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />

          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-[#E9D5FF] rounded-full blur-3xl opacity-40 translate-x-1/3 translate-y-1/3" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 md:py-16">
            <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
              {/* IMAGE */}
              <div
                className="
                  bg-white
                  border
                  border-[#F3E8FF]
                  rounded-[28px]
                  overflow-hidden
                  shadow-[0_10px_40px_rgba(168,85,247,0.08)]
                "
              >
                <div className="relative aspect-square bg-[#FAF5FF] flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={
                        language === 'es'
                          ? product.name
                          : product.name_english || product.name
                      }
                      className="
                        object-contain
                        w-full
                        h-full
                        max-h-[620px]
                        p-8
                        transition-transform
                        duration-500
                        hover:scale-[1.03]
                      "
                    />
                  ) : (
                    <div className="text-sm text-[#8B5CF6]">
                      {t('noImage')}
                    </div>
                  )}

                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    {product.isNew && (
                      <span
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-[#EC4899]
                          text-white
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          shadow-sm
                        "
                      >
                        {t('new')}
                      </span>
                    )}

                    {product.featured && (
                      <span
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-[#A855F7]
                          text-white
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          shadow-sm
                        "
                      >
                        {t('featured')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="space-y-6">
                <div
                  className="
                    bg-white
                    border
                    border-[#F3E8FF]
                    rounded-[28px]
                    p-8
                    md:p-10
                    shadow-[0_10px_40px_rgba(168,85,247,0.08)]
                  "
                >
                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      xl:text-6xl
                      font-black
                      text-[#2E1065]
                      leading-[1.05]
                      mb-8
                    "
                  >
                    {language === 'es'
                      ? product.name
                      : product.name_english || product.name}
                  </h1>

                  {/* PRICE */}
                  <div
                    className="
                      bg-[#FAF5FF]
                      border
                      border-[#E9D5FF]
                      rounded-[22px]
                      p-7
                      mb-8
                    "
                  >
                    <span
                      className="
                        text-xs
                        uppercase
                        tracking-[0.24em]
                        text-[#8B5CF6]
                        font-bold
                        block
                        mb-4
                      "
                    >
                      {t('price')}
                    </span>

                    <div className="flex items-end gap-3 flex-wrap">
                      <span
                        className="
                          text-5xl
                          md:text-6xl
                          font-black
                          text-[#2E1065]
                          leading-none
                        "
                      >
                        $
                        {formatPrice(product.price)}
                      </span>

                      <span className="text-sm font-semibold text-[#7E7290] mb-2">
                        {t('tax')}
                      </span>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <h2
                      className="
                        text-xs
                        uppercase
                        tracking-[0.24em]
                        font-black
                        text-[#A855F7]
                        mb-5
                      "
                    >
                      {t('description')}
                    </h2>

                    <p
                      className="
                        text-base
                        md:text-lg
                        leading-[1.9]
                        text-[#5B506C]
                      "
                    >
                      {language === 'es'
                        ? product.description
                        : product.description_english}
                    </p>
                  </div>
                </div>

                {/* BUY BOX */}
                <div
                  className="
                    bg-white
                    border
                    border-[#F3E8FF]
                    rounded-[28px]
                    p-8
                    shadow-[0_10px_40px_rgba(168,85,247,0.08)]
                  "
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* QUANTITY */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        bg-[#FAF5FF]
                        border
                        border-[#E9D5FF]
                        rounded-[18px]
                        px-3
                        h-16
                        sm:w-52
                      "
                    >
                      <button
                        type="button"
                        onClick={handleDecrement}
                        className="
                          w-11
                          h-11
                          rounded-[14px]
                          flex
                          items-center
                          justify-center
                          hover:bg-white
                          transition-all
                        "
                      >
                        <Minus className="w-4 h-4 text-[#2E1065]" />
                      </button>

                      <span className="font-black text-[#2E1065] text-xl">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={handleIncrement}
                        className="
                          w-11
                          h-11
                          rounded-[14px]
                          flex
                          items-center
                          justify-center
                          hover:bg-white
                          transition-all
                        "
                      >
                        <Plus className="w-4 h-4 text-[#2E1065]" />
                      </button>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className={`
                        flex-1
                        h-16
                        rounded-[18px]
                        font-bold
                        text-sm
                        transition-all
                        duration-300
                        flex
                        items-center
                        justify-center
                        gap-3
                        ${
                          isAdding
                            ? 'bg-[#DCFCE7] text-[#166534]'
                            : 'bg-[#A855F7] hover:bg-[#9333EA] text-white hover:shadow-lg'
                        }
                      `}
                    >
                      {isAdding ? (
                        <>
                          <Check className="w-5 h-5" />
                          {t('added')}
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          {t('addToCart')}
                        </>
                      )}
                    </button>
                  </div>

                  {currentInCartCount > 0 && (
                    <div
                      className="
                        mt-5
                        bg-[#FFF1F8]
                        border
                        border-[#FBCFE8]
                        rounded-[18px]
                        px-5
                        py-4
                        text-sm
                        text-[#6B4C62]
                      "
                    >
                      {t('cartQuantityText')}{' '}
                      <span className="font-black text-[#DB2777]">
                        {currentInCartCount}
                      </span>{' '}
                      {t('cartQuantityUnits')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
            <div>
              <h2 className="text-4xl font-black text-[#2E1065]">
                {t('relatedTitle')}
              </h2>

              <p className="text-[#7E7290] mt-3 text-lg">
                {t('relatedDescription')}
              </p>
            </div>

            <button
              onClick={() => router.push('/tienda')}
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-[#A855F7]
                hover:text-[#9333EA]
                transition-all
              "
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loadingRelated ? (
            <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-7">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="
                    bg-white
                    border
                    border-[#F3E8FF]
                    rounded-[24px]
                    overflow-hidden
                    animate-pulse
                  "
                >
                  <div className="aspect-square bg-[#FAF5FF]" />

                  <div className="p-6 space-y-4">
                    <div className="h-4 rounded bg-[#F3E8FF]" />
                    <div className="h-6 rounded bg-[#F3E8FF]" />
                    <div className="h-4 rounded bg-[#F3E8FF] w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : cleanRelatedProducts.length === 0 ? (
            <div
              className="
                bg-white
                border
                border-[#F3E8FF]
                rounded-[24px]
                py-20
                px-8
                text-center
              "
            >
              <div
                className="
                  w-24
                  h-24
                  rounded-[24px]
                  bg-[#FAF5FF]
                  border
                  border-[#E9D5FF]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-6
                "
              >
                <Package className="w-10 h-10 text-[#A855F7]" />
              </div>

              <h3 className="text-2xl font-black text-[#2E1065] mb-3">
                {t('noRelatedTitle')}
              </h3>

              <p className="text-[#7E7290] max-w-lg mx-auto leading-relaxed">
                {t('noRelatedDescription')}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-7">
              {cleanRelatedProducts.slice(0, 3).map((relProd) => (
                <article
                  key={relProd.id}
                  onClick={() => {
                    router.push(`/tienda/${relProd.slug}`);
                    setQuantity(1);
                  }}
                  className="
                    group
                    bg-white
                    border
                    border-[#F3E8FF]
                    rounded-[24px]
                    overflow-hidden
                    shadow-[0_10px_35px_rgba(168,85,247,0.06)]
                    hover:shadow-[0_20px_50px_rgba(168,85,247,0.14)]
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    cursor-pointer
                    flex
                    flex-col
                  "
                >
                  <div className="relative aspect-square bg-[#FAF5FF] overflow-hidden">
                    <img
                      src={relProd.image}
                      alt={relProd.name}
                      className="
                        object-contain
                        w-full
                        h-full
                        p-5
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {relProd.isNew && (
                        <span
                          className="
                            px-3
                            py-1.5
                            rounded-full
                            bg-[#EC4899]
                            text-white
                            text-[10px]
                            font-bold
                            uppercase
                          "
                        >
                          {t('new')}
                        </span>
                      )}

                      {relProd.featured && (
                        <span
                          className="
                            px-3
                            py-1.5
                            rounded-full
                            bg-[#A855F7]
                            text-white
                            text-[10px]
                            font-bold
                            uppercase
                          "
                        >
                          {t('featured')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-5">
                      <h3
                        className="
                          font-black
                          text-[#2E1065]
                          text-lg
                          line-clamp-2
                          group-hover:text-[#A855F7]
                          transition-colors
                        "
                      >
                        {language == 'es'
                          ? relProd.name
                          : relProd.name_english}
                      </h3>

                      <p
                        className="
                          text-sm
                          text-[#7E7290]
                          mt-3
                          line-clamp-2
                          leading-relaxed
                        "
                      >
                        {language == 'es'
                          ? relProd.description
                          : relProd.description_english}
                      </p>
                    </div>

                    <div
                      className="
                        mt-auto
                        pt-5
                        border-t
                        border-[#F3E8FF]
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <div>
                        <span className="block text-xs text-[#9D8CB3] mb-1">
                          {t('price')}
                        </span>

                        <span className="font-black text-[#2E1065] text-lg">
                          $
                          {formatPrice(relProd.price)} {t('tax')}
                        </span>
                      </div>

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          text-[#A855F7]
                        "
                      >
                        {t('viewDetail')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { processKeycopPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";

const VALID_COUPONS = [
  { code: "MED10", discount: 0.1 },
  { code: "CONFIANZA15", discount: 0.15 },
  { code: "PROMO20", discount: 0.2 },
];

type Step = 1 | 2 | 3;

function CardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#E9D5FF] bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#F3E8FF] pb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E9D5FF] bg-[#FAF5FF]">
        <Icon className="h-4 w-4 text-[#A855F7]" />
      </div>
      <h3 className="text-xs font-bold uppercase  text-[#4B3A42]">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  className = "",
  maxLength,
  mono = false,
  inputClassName = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mono?: boolean;
  inputClassName?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[11px] font-bold uppercase  text-[#8A7680]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full rounded-2xl border border-[#E9D5FF] bg-[#FCFAFF] px-4 py-3 text-sm text-[#4B3A42] outline-none transition-all placeholder:text-[#B7A4AA] focus:border-[#C084FC] focus:ring-4 focus:ring-[#E9D5FF]/60 ${mono ? "font-mono" : ""
          } ${inputClassName}`}
      />
    </div>
  );
}

export default function CarritoCheckoutPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
    direccion2: "",
    ciudad: "",
    estado: "",
    cp: "",
    pais: "MX",
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  });

  const discountAmount = appliedCoupon ? total * appliedCoupon.discount : 0;
  const totalWithDiscount = total - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const found = VALID_COUPONS.find(
      (c) => c.code === couponInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponInput("");
      return;
    }

    setCouponError(t("financial.couponInvalid"));
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    const uniqueOrderId = `MC-${Date.now()}`;

    // Construir la URL completa de confirmación incluyendo la referencia de la orden
    const confirmationRedirectUrl = `${window.location.origin}/confirmacion?reference=${uniqueOrderId}&state=APPROVED`;

    const paymentPayload = {
      amount: Number(grandTotal.toFixed(2)),
      orderId: uniqueOrderId,
      redirectUrl: confirmationRedirectUrl, // 👈 Se le pasa la URL de tu app
      cardData: {
        number: formData.cardNumber.replace(/\s/g, ""),
        name: formData.cardName.trim(),
        month: formData.cardMonth.trim(),
        year: formData.cardYear.trim(),
        cvv: formData.cardCvv.trim(),
      },
      customer: {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        direccion2: formData.direccion2.trim() || undefined,
        ciudad: formData.ciudad.trim(),
        estado: formData.estado.trim(),
        pais: formData.pais,
        cp: formData.cp.trim(),
        empresa: formData.empresa.trim() || undefined,
      },
      metadata: {
        notes: appliedCoupon
          ? `${t("metadata.couponApplied")}: ${appliedCoupon.code}`
          : t("metadata.standardSale"),
      },
    };

    try {
      const response = await processKeycopPayment(paymentPayload);
      console.log(response)

      // 1. Si requiere autenticación 3DS (Redirección bancaria)
      if (response.needsRedirect && response.redirectUrl) {
        window.location.href = response.redirectUrl;
        return;
      }

      // 2. Si el pago fue aprobado de inmediato sin 3DS
      if (response.success) {
        // Limpiar carrito u otras acciones necesarias
        clearCart();

        // Redirigir a la página de confirmación con los datos en Query Params
        const successUrl = `/confirmacion?status=${response.status}&reference=${response.reference}&transactionId=${response.data?.transactionId || response.orderId}&amount=${paymentPayload.amount}`;
        window.location.href = successUrl;
      } else {
        setErrorMessage(response.error  || response.data.message || t("errors.declined"));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t("errors.connection"));
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <main className="flex min-h-screen flex-col justify-between bg-[#FCFAFF]">
        <Header />
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E9D5FF] bg-[#FAF5FF] text-[#4B3A42]">
            <CheckCircle2 className="h-9 w-9 text-[#A855F7]" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-[#4B3A42]">
            {t("success.title")}
          </h1>
          <p className="mb-6 text-sm text-[#6E5B63]">
            {t("success.description")}
          </p>

          <CardShell className="mb-8 w-full space-y-3 p-6 text-left">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-[#8A7680]">
                {t("success.transactionStatus")}
              </span>
              <span className="rounded-full bg-[#FAF5FF] px-2 py-0.5 text-xs font-bold text-[#7E22CE]">
                {t("success.approved")}
              </span>
            </div>
          </CardShell>

          <Link href="/tienda" className="w-full">
            <Button className="w-full rounded-2xl bg-[#A855F7] py-6 text-base font-semibold text-white transition-all hover:bg-[#9333EA]">
              {t("success.backToCatalog")}
            </Button>
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAFF]">
      <Header />

      <div className="sticky top-0 z-10 border-b border-[#E9D5FF] bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#8A7680]">
            <Link href="/" className="transition-colors hover:text-[#4B3A42]">
              {t("breadcrumb.home")}
            </Link>
            <span>/</span>
            <span className={step === 1 ? "font-bold text-[#A855F7]" : ""}>
              {t("breadcrumb.summary")}
            </span>
            <span>/</span>
            <span className={step === 2 ? "font-bold text-[#A855F7]" : ""}>
              {t("breadcrumb.shippingPayment")}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${step >= 1 ? "bg-[#EC4899]" : "bg-[#E9D5FF]"}`} />
            <div className={`h-1 w-12 rounded-full ${step >= 2 ? "bg-[#EC4899]" : "bg-[#E9D5FF]"}`} />
            <div className={`h-3 w-3 rounded-full ${step >= 2 ? "bg-[#EC4899]" : "bg-[#E9D5FF]"}`} />
          </div>
        </div>
      </div>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <CardShell className="mx-auto max-w-lg p-10 text-center">
              <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-[#E9D5FF]" />
              <h2 className="mb-2 text-xl font-bold text-[#4B3A42]">
                {t("empty.title")}
              </h2>
              <p className="mb-6 text-xs text-[#6E5B63]">
                {t("empty.description")}
              </p>
              <Link href="/tienda">
                <Button className="rounded-2xl bg-[#EC4899] px-6 text-white transition-all hover:bg-[#DB2777]">
                  {t("empty.goToStore")}
                </Button>
              </Link>
            </CardShell>
          ) : (
            <div className="grid items-start gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {errorMessage && (
                  <div className="flex items-center gap-2 rounded-2xl border border-[#F3C7D0] bg-[#FFF1F3] p-4 text-xs font-semibold text-[#C84C6A]">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <CardShell className="flex items-center justify-between p-5">
                      <h2 className="text-sm font-bold uppercase  text-[#4B3A42]">
                        {t("order.title")}
                      </h2>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="flex items-center gap-1 text-xs font-bold text-[#C84C6A] transition-colors hover:underline"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> {t("order.clear")}
                      </button>
                    </CardShell>

                    {items.map((item) => (
                      <CardShell key={item.product.id} className="flex gap-5 p-5">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-[#F3E5E8] bg-[#FCFAFF]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <span className="rounded-full bg-[#FAF5FF] px-2 py-0.5 text-[10px] font-bold capitalize text-[#7E22CE]">
                                {item.product.category_slug}
                              </span>
                              <h3 className="mt-2 line-clamp-1 text-xs font-bold text-[#4B3A42]">
                                {item.product.name}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id)}
                              className="p-1 text-[#B7A4AA] transition-colors hover:text-[#C84C6A]"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-2xl border border-[#E9D5FF] bg-[#FCFAFF] p-1">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="rounded-2xl p-2 transition-colors hover:bg-white"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-9 text-center text-xs font-bold text-[#4B3A42]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="rounded-2xl p-2 transition-colors hover:bg-white"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-black text-[#4B3A42]">
                              {formatPrice(item.product.price * item.quantity, "MXN", true)}
                            </span>
                          </div>
                        </div>
                      </CardShell>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <form
                    id="keycop-payment-form"
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-6"
                  >
                    <CardShell className="space-y-5 p-7">
                      <SectionTitle icon={User} title={t("form.buyerTitle")} />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("form.firstName")}
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.lastName")}
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.email")}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.phone")}
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.company")}
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          className="sm:col-span-2"
                        />
                      </div>
                    </CardShell>

                    <CardShell className="space-y-5 p-7">
                      <SectionTitle icon={MapPin} title={t("form.addressTitle")} />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("form.streetAddress")}
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.streetAddressPlaceholder")}
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.neighborhood")}
                          name="direccion2"
                          value={formData.direccion2}
                          onChange={handleInputChange}
                          placeholder={t("form.neighborhoodPlaceholder")}
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.city")}
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.state")}
                          name="estado"
                          value={formData.estado}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.statePlaceholder")}
                        />
                        <Field
                          label={t("form.postalCode")}
                          name="cp"
                          value={formData.cp}
                          onChange={handleInputChange}
                          required
                        />
                        <div>
                          <label className="mb-2 block text-[11px] font-bold uppercase text-[#8A7680]">
                            {t("form.country")}
                          </label>
                          <select
                            name="pais"
                            value={formData.pais}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-[#E9D5FF] bg-[#FCFAFF] px-4 py-3 text-sm text-[#4B3A42] outline-none transition-all focus:border-[#C084FC] focus:ring-4 focus:ring-[#E9D5FF]/60"
                          >
                            <option value="MX">{t("form.mexico")}</option>
                          </select>
                        </div>
                      </div>
                    </CardShell>

                    <CardShell className="space-y-5 p-7">
                      <SectionTitle icon={CreditCard} title={t("form.paymentTitle")} />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Field
                          label={t("form.cardNumber")}
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          maxLength={16}
                          placeholder={t("form.cardNumberPlaceholder")}
                          className="sm:col-span-3"
                          mono
                          inputClassName="tracking-widest"
                        />
                        <Field
                          label={t("form.cardHolderName")}
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.cardHolderPlaceholder")}
                          className="sm:col-span-3"
                        />
                        <Field
                          label={t("form.expiryMonth")}
                          name="cardMonth"
                          value={formData.cardMonth}
                          onChange={handleInputChange}
                          required
                          maxLength={2}
                          placeholder={t("form.expiryMonthPlaceholder")}
                          mono
                          inputClassName="text-center"
                        />
                        <Field
                          label={t("form.expiryYear")}
                          name="cardYear"
                          value={formData.cardYear}
                          onChange={handleInputChange}
                          required
                          maxLength={2}
                          placeholder={t("form.expiryYearPlaceholder")}
                          mono
                          inputClassName="text-center"
                        />
                        <Field
                          label={t("form.cvv")}
                          name="cardCvv"
                          type="password"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          placeholder={t("form.cvvPlaceholder")}
                          mono
                          inputClassName="text-center"
                        />
                      </div>
                    </CardShell>
                  </form>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6 rounded-2xl border border-[#E9D5FF] bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-bold uppercase text-[#4B3A42]">
                    {t("financial.title")}
                  </h2>

                  {step === 1 && (
                    <div className="space-y-3 border-b border-[#F3E8FF] pb-5">
                      {!appliedCoupon ? (
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={t("financial.couponPlaceholder")}
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="flex-1 rounded-2xl border border-[#E9D5FF] bg-[#FCFAFF] px-4 py-3 text-xs font-mono uppercase  text-[#4B3A42] outline-none transition-all placeholder:text-[#B7A4AA] focus:border-[#C084FC] focus:ring-4 focus:ring-[#E9D5FF]/60"
                          />
                          <button
                            type="submit"
                            className="rounded-2xl bg-[#4B3A42] px-4 text-xs font-bold text-white transition-colors hover:bg-[#3D2B34]"
                          >
                            {t("financial.applyCoupon")}
                          </button>
                        </form>
                      ) : (
                        <div className="flex items-center justify-between rounded-2xl border border-[#F3C7D0] bg-[#FFF1F3] p-3">
                          <div className="text-xs font-medium text-[#9D5670]">
                            {t("financial.appliedCoupon", {
                              code: appliedCoupon.code,
                              discount: appliedCoupon.discount * 100,
                            })}
                          </div>
                          <button
                            type="button"
                            onClick={() => setAppliedCoupon(null)}
                            className="text-[10px] font-bold text-[#C84C6A] transition-colors hover:underline"
                          >
                            {t("financial.remove")}
                          </button>
                        </div>
                      )}
                      {couponError && (
                        <p className="text-[10px] font-bold text-[#C84C6A]">
                          ⚠️ {couponError}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-3 border-b border-[#F3E8FF] pb-5 text-xs font-medium text-[#6E5B63]">
                    <div className="flex justify-between">
                      <span>{t("financial.subtotal")}</span>
                      <span className="font-bold text-[#4B3A42]">
                        {formatPrice(total, "MXN", true)}
                      </span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-[#EC4899]">
                        <span>{t("financial.discount")}</span>
                        <span className="font-bold">
                          -{formatPrice(discountAmount, "MXN", true)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-[#4B3A42]">
                      {t("financial.netTotal")}
                    </span>
                    <span className="text-2xl font-black text-[#4B3A42]">
                      {formatPrice(grandTotal, "MXN", true)}
                    </span>
                  </div>
                  <p className="-mt-4 text-right text-[10px] text-[#8A7680]">
                    {t("financial.tax", {
                      tax: formatPrice(iva, "MXN", true),
                    })}
                  </p>

                  {step === 1 ? (
                    <Button
                      onClick={() => setStep(2)}
                      className="w-full rounded-2xl bg-[#EC4899] py-6 text-sm font-bold  text-white transition-all hover:bg-[#DB2777]"
                    >
                      {t("actions.proceedToPayment")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        type="submit"
                        form="keycop-payment-form"
                        disabled={isProcessing}
                        className={`w-full rounded-2xl py-6 text-sm font-bold  text-white transition ${isProcessing
                          ? "cursor-wait bg-[#A855F7]"
                          : "bg-[#EC4899] hover:bg-[#DB2777]"
                          }`}
                      >
                        {isProcessing
                          ? t("actions.processing")
                          : t("actions.payAmount", {
                            amount: formatPrice(grandTotal, "MXN", true),
                          })}
                      </Button>

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => setStep(1)}
                        className="flex w-full items-center justify-center gap-1 py-1 text-center text-xs font-bold text-[#8A7680] transition-colors hover:text-[#4B3A42]"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        {t("actions.backToCart")}
                      </button>
                    </div>
                  )}

                  <div className="border-t border-[#F3E8FF] pt-4 text-center">
                    <p className="text-[10px] font-medium text-[#8A7680]">
                      {t("security.note")}
                    </p>
                    <div className="mt-4 flex flex-row justify-between gap-4 p-4">
                      <Image
                        src="/logo-keycop.webp"
                        alt={t("images.octanoAlt")}
                        width={150}
                        height={30}
                      />
                      <Image
                        src="/secure-payment.png"
                        alt={t("images.securePaymentAlt")}
                        width={150}
                        height={30}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
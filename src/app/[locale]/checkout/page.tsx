"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { PayRequestBody } from "@/types/checkout";
import {
    CreditCard,
    User,
    MapPin,
    Tag,
    Lock,
    ArrowLeft,
    CheckCircle2,
    Loader2,
    ShieldCheck,
    Sparkles,
    FileText,
    ShoppingBag
} from "lucide-react";
import { EmailItem } from "@/types/email-item";
import { ConfirmRequestBody } from "../api/checkout/route";
import { formatPrice } from "@/lib/price";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

interface Coupon {
    code: string;
    type: "percent" | "fixed";
    value: number;
}

const AVAILABLE_COUPONS: Coupon[] = [
    { code: "VULTRA10", type: "percent", value: 10 },
    { code: "VULTRAPRO50", type: "fixed", value: 500 },
];

export default function CheckoutPage() {
    const router = useRouter();
    const { items, total: subtotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [successOrderId, setSuccessOrderId] = useState<string | null>(null); // Estado para orden exitosa
    const t = useTranslations("checkoutPage");

    // Estado de Cupones
    const [couponInput, setCouponInput] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const locale = useLocale()

    // Formulario con todos los campos
    const [formData, setFormData] = useState({
        // Cliente
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        empresa: "",
        // Dirección
        direccion: "",
        direccion2: "",
        ciudad: "",
        estado: "",
        cp: "",
        pais: "MX",
        // Tarjeta
        cardNumber: "",
        cardName: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
        // Metadata
        notes: "",
    });

    // Cálculo de Descuentos, IVA y Total Final
    const discountAmount = useMemo(() => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.type === "percent") {
            return (subtotal * appliedCoupon.value) / 100;
        }
        return Math.min(appliedCoupon.value, subtotal);
    }, [subtotal, appliedCoupon]);

    const subtotalAfterDiscount = useMemo(() => {
        return Math.max(0, subtotal - discountAmount);
    }, [subtotal, discountAmount]);

    const ivaAmount = useMemo(() => {
        return subtotalAfterDiscount * 0.16; // 16% de IVA
    }, [subtotalAfterDiscount]);

    const finalTotal = useMemo(() => {
        return subtotalAfterDiscount + ivaAmount;
    }, [subtotalAfterDiscount, ivaAmount]);

    // Manejo de cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validar y aplicar cupón
    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanCode = couponInput.trim().toUpperCase();

        if (!cleanCode) {
            toast.error(t("toasts.enterCoupon"));
            return;
        }

        const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

        if (found) {
            setAppliedCoupon(found);
            toast.success(t("toasts.couponApplied", { code: found.code }));
        } else {
            toast.error(t("toasts.invalidCoupon"));
        }
    };

    // Procesar pago contra /api/pay
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            toast.error(t("toasts.emptyCart"));
            return;
        }

        setLoading(true);

        const payPayload: PayRequestBody = {
            amount: finalTotal,
            currency: "MXN",
            cardData: {
                number: formData.cardNumber,
                name: formData.cardName,
                month: formData.cardMonth,
                year: formData.cardYear,
                cvv: formData.cardCvv,
            },
            customer: {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                direccion2: formData.direccion2 || undefined,
                ciudad: formData.ciudad,
                estado: formData.estado,
                cp: formData.cp,
                pais: formData.pais || "MX",
                empresa: formData.empresa || undefined,
            },
            metadata: {
                notes: formData.notes || undefined,
            },
        };

        try {
            const payRes = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payPayload),
            });

            const payResult = await payRes.json();

            if (!payRes.ok || !payResult.success) {
                throw new Error(payResult.error || t("toasts.paymentDeclined"));
            }

            const emailItems: EmailItem[] = items.map((item) => ({
                id: item.id,
                title: item.product?.name || t("defaultServiceTitle"),
                price: item.price,
                quantity: item.quantity,
                description: item.product?.name || undefined,
            }));

            const confirmPayload: ConfirmRequestBody = {
                orderId: payResult.orderId,
                amount: finalTotal,
                items: emailItems,
                customer: {
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    email: formData.email,
                    telefono: formData.telefono,
                    direccion: formData.direccion,
                    ciudad: formData.ciudad,
                    estado: formData.estado,
                    cp: formData.cp,
                },
                notes: formData.notes || undefined,
            };

            await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...confirmPayload,
                    locale
                }),
            });

            toast.success(t("toasts.paymentSuccess", { orderId: payResult.orderId }));
            
            // Mostrar pantalla de éxito y limpiar carrito
            setSuccessOrderId(payResult.orderId);
            clearCart();

        } catch (error: any) {
            toast.error(error.message || t("toasts.paymentError"));
        } finally {
            setLoading(false);
        }
    };

    // 1. Renderizar vista de Éxito si hay un ID de orden
    if (successOrderId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#7052ff] via-[#8266ff] to-[#613be7] flex flex-col items-center justify-center p-6">
                <div className="bg-white/90 mx-3 mt-16 backdrop-blur-xl border border-white/50 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl transition-all scale-100 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3">{t("success.title")}</h2>
                    <p className="text-slate-600 mb-8 text-sm leading-relaxed">{t("success.description")}</p>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t("success.orderIdLabel")}</p>
                        <p className="text-xl font-mono font-black text-slate-800 break-all">{successOrderId}</p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-gradient-to-r from-[#7f32f3] to-[#a033ff] hover:from-[#6e22df] hover:to-[#8e22ee] text-white font-bold rounded-2xl shadow-lg shadow-purple-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {t("success.continueShopping")}
                    </Link>
                </div>
            </div>
        );
    }

    // 2. Renderizar carrito vacío (solo si no hay successOrderId)
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#7052ff] via-[#8266ff] to-[#613be7] flex flex-col items-center justify-center p-6">
                <div className="bg-white/80 mx-3 mt-16 backdrop-blur-xl border border-white/50 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                    <h2 className="text-2xl font-black text-slate-900 mb-2">{t("emptyTitle")}</h2>
                    <p className="text-slate-600 mb-6 text-sm">{t("emptyDescription")}</p>
                    <Link
                        href="/carrito"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#7f32f3] to-[#a033ff] hover:from-[#6e22df] hover:to-[#8e22ee] text-white font-semibold rounded-2xl shadow-lg shadow-purple-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t("returnToCart")}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#7052ff] via-[#8266ff] to-[#613be7] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-3 mt-16 space-y-6">

                {/* Header iOS Style */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-4 sm:p-6 shadow-xl flex items-center justify-between transition-all">
                    <Link
                        href="/carrito"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-sm border border-slate-200/60"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t("returnToCart")}
                    </Link>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        {t("secureBadge")}
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Formulario Principal - Sin cambios, código condensado por espacio pero asume que es el mismo que tenías */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 1. Datos Personales */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl space-y-5 transition-all hover:shadow-2xl hover:bg-white/75">
                            <div className="flex items-center gap-3 border-b border-purple-100/60 pb-3">
                                <div className="p-2.5 bg-purple-500/10 text-purple-600 rounded-2xl">
                                    <User className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{t("contactSection.title")}</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("contactSection.firstName")} *</label>
                                    <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("contactSection.lastName")} *</label>
                                    <input required type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("contactSection.email")} *</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("contactSection.phone")} *</label>
                                    <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="5512345678" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("contactSection.company")} <span className="text-slate-400 font-normal">({t("optional")})</span></label>
                                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder={t("contactSection.companyPlaceholder")} />
                                </div>
                            </div>
                        </div>

                        {/* 2. Dirección */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl space-y-5 transition-all hover:shadow-2xl hover:bg-white/75">
                            <div className="flex items-center gap-3 border-b border-purple-100/60 pb-3">
                                <div className="p-2.5 bg-purple-500/10 text-purple-600 rounded-2xl">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{t("addressSection.title")}</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("addressSection.street")} *</label>
                                    <input required type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="Av. Insurgentes Sur 123" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("addressSection.suite")} <span className="text-slate-400 font-normal">({t("optional")})</span></label>
                                    <input type="text" name="direccion2" value={formData.direccion2} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="Depto 4B" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("addressSection.city")} *</label>
                                    <input required type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="Ciudad de México" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("addressSection.state")} *</label>
                                    <input required type="text" name="estado" value={formData.estado} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="CDMX" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("addressSection.zip")} *</label>
                                    <input required type="text" name="cp" value={formData.cp} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder="01000" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("addressSection.country")} <span className="text-slate-400 font-normal">({t("optional")})</span></label>
                                    <select name="pais" value={formData.pais} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner">
                                        <option value="MX">{t("addressSection.countries.MX")}</option>
                                        <option value="US">{t("addressSection.countries.US")}</option>
                                        <option value="ES">{t("addressSection.countries.ES")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 3. Información de Pago */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl space-y-5 transition-all hover:shadow-2xl hover:bg-white/75">
                            <div className="flex items-center gap-3 border-b border-purple-100/60 pb-3">
                                <div className="p-2.5 bg-purple-500/10 text-purple-600 rounded-2xl">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{t("paymentSection.title")}</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-3">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("paymentSection.cardName")} *</label>
                                    <input required type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder={t("paymentSection.cardNamePlaceholder")} />
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("paymentSection.cardNumber")} *</label>
                                    <input required type="text" name="cardNumber" maxLength={16} value={formData.cardNumber} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner tracking-widest font-mono" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("paymentSection.cardMonth")} *</label>
                                    <input required type="text" name="cardMonth" maxLength={2} value={formData.cardMonth} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner text-center font-mono" placeholder="08" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("paymentSection.cardYear")} *</label>
                                    <input required type="text" name="cardYear" maxLength={4} value={formData.cardYear} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner text-center font-mono" placeholder="28" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">{t("paymentSection.cvv")} *</label>
                                    <input required type="password" name="cardCvv" maxLength={4} value={formData.cardCvv} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner text-center font-mono" placeholder="123" />
                                </div>
                            </div>
                        </div>

                        {/* 4. Notas Adicionales */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl space-y-3 transition-all hover:shadow-2xl hover:bg-white/75">
                            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                                <FileText className="w-4 h-4 text-purple-600" />
                                {t("notesLabel")} <span className="text-slate-400 font-normal">({t("optional")})</span>
                            </div>
                            <textarea name="notes" rows={2} value={formData.notes} onChange={handleChange} className="w-full bg-white/80 border border-slate-200/80 rounded-2xl p-3.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner" placeholder={t("notesPlaceholder")} />
                        </div>
                    </div>

                    {/* Resumen Lateral + Cupones + Pagar */}
                    <div className="space-y-6">
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl space-y-6 sticky top-6">
                            <h2 className="text-xl font-extrabold text-slate-900 border-b border-purple-100/60 pb-4">
                                {t("summaryTitle")}
                            </h2>

                            {/* Lista corta de items */}
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm p-3 bg-white/50 rounded-2xl border border-white/60 shadow-sm">
                                        <div className="pr-2">
                                            <p className="font-bold text-slate-800">{item.product?.name}</p>
                                            <p className="text-xs text-slate-500">{t("qtyLabel")}: {item.quantity} {item.product?.sku && `• ${item.price}`}</p>
                                        </div>
                                        <span className="font-extrabold text-slate-900 whitespace-nowrap">{formatPrice(item.subtotal)} MXN</span>
                                    </div>
                                ))}
                            </div>

                            {/* Input de Cupón */}
                            <div className="border-t border-purple-100/60 pt-4">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-purple-600" /> {t("couponLabel")}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        placeholder={t("couponPlaceholder")}
                                        className="w-full bg-white/80 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-sm font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-bold rounded-2xl transition-all shadow-md"
                                    >
                                        {t("applyCoupon")}
                                    </button>
                                </div>

                                {appliedCoupon && (
                                    <div className="mt-3 flex items-center justify-between text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 p-2.5 rounded-2xl font-semibold backdrop-blur-md">
                                        <span className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t("couponAppliedBadge", { code: appliedCoupon.code })}
                                        </span>
                                        <button type="button" onClick={() => setAppliedCoupon(null)} className="text-slate-500 hover:text-slate-800 underline font-normal">{t("removeCoupon")}</button>
                                    </div>
                                )}
                            </div>

                            {/* Totales con IVA */}
                            <div className="space-y-3 border-t border-purple-100/60 pt-4 text-sm">
                                <div className="flex justify-between text-slate-600 font-medium">
                                    <span>{t("subtotal")}</span>
                                    <span>{formatPrice(subtotal)} MXN</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-emerald-600 font-bold">
                                        <span>{t("discount")}</span>
                                        <span>- {formatPrice(discountAmount)} MXN</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-slate-500 font-medium">
                                    <span>{t("iva")}</span>
                                    <span>{formatPrice(ivaAmount)} MXN</span>
                                </div>
                                <div className="flex justify-between items-baseline border-t border-purple-100/60 pt-3">
                                    <span className="text-base font-bold text-slate-900">{t("totalToPay")}</span>
                                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        {formatPrice(finalTotal)} MXN
                                    </span>
                                </div>
                            </div>

                            {/* Botón Final de Pago */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-[#7f32f3] to-[#a033ff] hover:from-[#6e22df] hover:to-[#8e22ee] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl shadow-lg shadow-purple-600/30 transition-all duration-200 flex items-center justify-center gap-2 text-base tracking-wide"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t("processingPayment")}
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        {t("payButton", { amount: formatPrice(finalTotal) })}
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-slate-500 font-medium">
                                {t("termsNotice")}
                            </p>

                            <div className="flex flex-row justify-center items-center gap-6 pt-2 opacity-80">
                                <Image src="/logo-keycop.webp" alt="etomin" width={120} height={30} className="object-contain" />
                                <Image src="/secure-payment.png" alt="secure" width={150} height={20} className="object-contain" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
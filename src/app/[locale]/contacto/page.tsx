"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  MapPin,
  Phone,
  Mail,
  Send,
 CheckCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useCart } from "@/context/CartContext";
import { useContact } from "@/hooks/useContact";

export default function ContactoPage() {
  const t = useTranslations("contactPage");

  const contactInfo = [
    {
      icon: MapPin,
      title: t("info.visit.title"),
      subtitle: t("info.visit.subtitle"),
      details: [
        t("info.visit.address1"),
        t("info.visit.address2"),
        t("info.visit.address3"),
        t("info.visit.address4"),
        t("info.visit.address5"),
      ],
    },
    {
      icon: Phone,
      title: t("info.call.title"),
      subtitle: t("info.call.subtitle"),
      details: ["+52 1 55 2583 6217"],
      link: "tel:+5215525836217",
    },
    {
      icon: Mail,
      title: t("info.email.title"),
      subtitle: t("info.email.subtitle"),
      details: ["hello@medionmx.com"],
      link: "mailto:hello@medionmx.com",
    },
  ];

  const { itemCount } = useCart();

  const { sendContactForm, isLoading } = useContact();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError("");

    const response = await sendContactForm(formData);

    if (response.success) {
      setIsSubmitted(true);

      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setSubmitError(response.error || t("errors.unexpected"));
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#FCFAFF]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#F3E5E8] bg-white py-24 md:py-32">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#FAF5FF]" />
          <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[#FCE7F3]" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#F3E8FF]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div
              className="
                mb-7
                inline-flex
                items-center
                rounded-full
                border
                border-[#E9D5FF]
                bg-[#FAF5FF]
                px-5
                py-2
              "
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A855F7]">
                {t("hero.title")}
              </span>
            </div>

            <h1 className="font-poppins text-5xl font-black leading-[1.05] tracking-tight text-[#2C1338] md:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#6E5B63] md:text-lg">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* INFO */}
      <section className="relative py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {contactInfo.map((info, index) => (
              <motion.div
                key={`contact-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-[#F3E5E8]
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                "
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.06),transparent_55%)]" />

                <div
                  className="
                    relative
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#E9D5FF]
                    bg-[#FAF5FF]
                  "
                >
                  <info.icon className="h-6 w-6 text-[#A855F7]" />
                </div>

                <span className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-[#EC4899]">
                  {info.subtitle}
                </span>

                <h3 className="relative mt-3 mb-5 font-poppins text-2xl font-bold text-[#2C1338]">
                  {info.title}
                </h3>

                {info.link ? (
                  <a
                    href={info.link}
                    className="
                      relative
                      text-sm
                      font-medium
                      leading-relaxed
                      text-[#5B4C64]
                      transition-colors
                      hover:text-[#A855F7]
                    "
                  >
                    {info.details[0]}
                  </a>
                ) : (
                  <div className="relative space-y-2">
                    {info.details.map((detail, i) => (
                      <p
                        key={`detail-${i}`}
                        className="text-sm leading-relaxed text-[#5B4C64]"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
                relative
                overflow-hidden
                rounded-[2.5rem]
                border
                border-[#F3E5E8]
                bg-white
                shadow-sm
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.06),transparent_50%)]" />

              <div className="relative p-8 md:p-10">
                <div className="mb-10">
                  <div
                    className="
                      mb-5
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-[#FCE7F3]
                      bg-[#FFF8FA]
                      px-4
                      py-2
                    "
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#EC4899]">
                      {t("form.title")}
                    </span>
                  </div>

                  <h2 className="font-poppins text-4xl font-black text-[#2C1338]">
                    {t("form.title")}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6E5B63]">
                    {t("form.description")}
                  </p>
                </div>

                {submitError && (
                  <div
                    className="
                      mb-6
                      flex
                      items-start
                      gap-3
                      rounded-2xl
                      border
                      border-[#F5C2CC]
                      bg-[#FFF1F3]
                      p-5
                      text-sm
                      font-medium
                      text-[#C84C6A]
                    "
                  >
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {isSubmitted ? (
                  <div
                    className="
                      rounded-[2rem]
                      border
                      border-[#C7EFD8]
                      bg-[#F5FFF8]
                      px-8
                      py-14
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
                        bg-[#E2F8EA]
                      "
                    >
                      <CheckCircle className="h-10 w-10 text-[#1EA75B]" />
                    </div>

                    <h3 className="font-poppins text-3xl font-bold text-[#1F6D45]">
                      {t("success.title")}
                    </h3>

                    <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#3D7A58]">
                      {t("success.description")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="nombre"
                          className="
                            mb-3
                            block
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-[#8B7B95]
                          "
                        >
                          {t("form.fullName")}
                        </label>

                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          required
                          disabled={isLoading}
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder={t("form.fullNamePlaceholder")}
                          className="
                            h-14
                            w-full
                            rounded-xl
                            border
                            border-[#E9D5FF]
                            bg-[#FCFAFF]
                            px-5
                            text-sm
                            text-[#2C1338]
                            outline-none
                            transition-all
                            placeholder:text-[#B4A6BC]
                            focus:border-[#C084FC]
                            focus:ring-4
                            focus:ring-[#E9D5FF]/60
                            disabled:opacity-60
                          "
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="
                            mb-3
                            block
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-[#8B7B95]
                          "
                        >
                          {t("form.email")}
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          disabled={isLoading}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("form.emailPlaceholder")}
                          className="
                            h-14
                            w-full
                            rounded-xl
                            border
                            border-[#E9D5FF]
                            bg-[#FCFAFF]
                            px-5
                            text-sm
                            text-[#2C1338]
                            outline-none
                            transition-all
                            placeholder:text-[#B4A6BC]
                            focus:border-[#C084FC]
                            focus:ring-4
                            focus:ring-[#E9D5FF]/60
                            disabled:opacity-60
                          "
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mensaje"
                        className="
                          mb-3
                          block
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#8B7B95]
                        "
                      >
                        {t("form.message")}
                      </label>

                      <textarea
                        id="mensaje"
                        name="mensaje"
                        required
                        disabled={isLoading}
                        rows={7}
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder={t("form.messagePlaceholder")}
                        className="
                          w-full
                          resize-none
                          rounded-2xl
                          border
                          border-[#E9D5FF]
                          bg-[#FCFAFF]
                          px-5
                          py-4
                          text-sm
                          text-[#2C1338]
                          outline-none
                          transition-all
                          placeholder:text-[#B4A6BC]
                          focus:border-[#C084FC]
                          focus:ring-4
                          focus:ring-[#E9D5FF]/60
                          disabled:opacity-60
                        "
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="
                        h-14
                        w-full
                        rounded-xl
                        bg-[#A855F7]
                        text-sm
                        font-bold
                        tracking-wide
                        text-white
                        transition-all
                        hover:bg-[#9333EA]
                      "
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t("form.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t("form.submit")}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* MAP */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="
                overflow-hidden
                rounded-[2.5rem]
                border
                border-[#F3E5E8]
                bg-white
                shadow-sm
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#F3E8FF]
                  px-8
                  py-6
                "
              >
                <div>
                  <h3 className="font-poppins text-2xl font-bold text-[#2C1338]">
                    {t("map.title")}
                  </h3>

                  <p className="mt-1 text-sm text-[#7C6B86]">
                    {t("map.subtitle")}
                  </p>
                </div>

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
                    bg-[#FAF5FF]
                  "
                >
                  <MapPin className="h-5 w-5 text-[#A855F7]" />
                </div>
              </div>

              <div className="h-80 lg:h-[760px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.402994869746!2d-99.2103289!3d19.4381843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20218e6121855%3A0x6dfea8c4f363522e!2sAv.%20Jaime%20Balmes%2011-INTERIOR%2015A%20TORRE%20A%20PISO%201%2C%20Polanco%2C%20Polanco%20I%20Secc%2C%20Miguel%20Hidalgo%2C%2011510%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1780337617019!5m2!1ses-419!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("map.iframeTitle")}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
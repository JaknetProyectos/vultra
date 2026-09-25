import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("features");

  const features = [
    t("items.0"),
    t("items.1"),
    t("items.2"),
    t("items.3"),
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#FAF5FF] opacity-80" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#FCE7F3] opacity-70" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3E8FF] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#E9D5FF]
              bg-[#FAF5FF]
              px-5
              py-2
              shadow-sm
              mb-6
            "
          >
            <span className="text-sm font-semibold text-[#7E22CE]">
              {t("badge")}
            </span>
          </div>

          <h2 className="font-poppins text-3xl md:text-5xl font-bold text-[#4B3A42] tracking-tight mb-6">
            {t("title")}
          </h2>

          <p className="text-[#6E5B63] max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
            {t("description")}
          </p>

          <p className="text-[#A855F7] font-semibold mt-5">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={`feature-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -6 }}
              className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-[#F3E5E8]
                bg-white
                p-6
                shadow-sm
                transition-all
                hover:shadow-[0_18px_40px_rgba(168,85,247,0.10)]
              "
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5FF]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  w-14
                  h-14
                  rounded-2xl
                  border
                  border-[#E9D5FF]
                  bg-[#FAF5FF]
                  mb-6
                  transition-all
                  duration-300
                  group-hover:bg-[#FCE7F3]
                "
              >
                <Check className="w-5 h-5 text-[#A855F7]" />
              </div>

              <p className="relative text-[#4B3A42] leading-relaxed text-sm md:text-base">
                {feature}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            relative
            overflow-hidden
            max-w-5xl
            mx-auto
            rounded-[2.5rem]
            border
            border-[#F3E5E8]
            bg-[#FAF5FF]
            px-8
            py-12
            text-center
            shadow-sm
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_60%)]" />

          <h3 className="relative font-poppins text-2xl md:text-4xl font-bold text-[#4B3A42] leading-relaxed tracking-tight">
            {t("footer")}
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { Globe2, Loader2, ArrowLeftRight } from "lucide-react";
import { useLocaleContext } from "@/context/LangContext";

export default function LangSwitcher() {
  const { locale, switchLanguage, isPending } = useLocaleContext();

  const nextLang = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => switchLanguage(nextLang)}
      disabled={isPending}
      aria-label="Cambiar idioma"
      className="
        group
        fixed
        bottom-5
        right-5
        z-50

        overflow-hidden

        flex items-center gap-3

        rounded-2xl

        border border-purple-400/20

        bg-[#120d1f]/90
        backdrop-blur-xl

        px-4 py-3

        shadow-[0_0_30px_rgba(168,85,247,0.12)]

        transition-all duration-300

        hover:-translate-y-1
        hover:border-fuchsia-400/40
        hover:shadow-[0_0_40px_rgba(192,132,252,0.25)]

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-gradient-to-r
          from-purple-500/10
          via-fuchsia-400/15
          to-violet-500/10
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-xl

          border border-purple-400/20

          bg-purple-500/10

          text-purple-300

          transition-all
          duration-500

          group-hover:rotate-12
          group-hover:scale-110
          group-hover:bg-purple-500/20
        "
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Globe2 className="h-5 w-5" />
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center leading-none">
        <div className="mt-1 flex items-center justify-center gap-2">
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-fuchsia-300
            "
          >
            {locale === "es" ? "Español" : "English"}
          </span>

          <ArrowLeftRight
            className="
              h-3.5
              w-3.5
              text-purple-300/70
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>
    </button>
  );
}

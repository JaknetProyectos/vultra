"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import {
  X,
  CheckCircle2,
  Info,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";

export type AlertType =
  | "error"
  | "success"
  | "warning"
  | "info";

export interface AlertOptions {
  title: string;
  message: string;
  icon?: React.ReactNode;
  image?: string;
  confirmText?: string;
  onClose?: () => void;
  type?: AlertType;
}

interface AlertContextType {
  showAlert: (
    options: AlertOptions
  ) => void;
  hideAlert: () => void;
}

const AlertContext =
  createContext<
    AlertContextType | undefined
  >(undefined);

const typeStyles: Record<
  AlertType,
  {
    accent: string;
    icon: string;
    button: string;
    ring: string;
  }
> = {
  success: {
    accent:
      "from-emerald-400/20 to-green-500/10",
    icon: "text-emerald-400",
    button:
      "bg-emerald-400 text-black hover:bg-emerald-300",
    ring: "ring-emerald-400/20",
  },
  error: {
    accent:
      "from-rose-400/20 to-red-500/10",
    icon: "text-rose-400",
    button:
      "bg-rose-400 text-black hover:bg-rose-300",
    ring: "ring-rose-400/20",
  },
  warning: {
    accent:
      "from-amber-300/20 to-orange-500/10",
    icon: "text-amber-300",
    button:
      "bg-amber-300 text-black hover:bg-amber-200",
    ring: "ring-amber-300/20",
  },
  info: {
    accent:
      "from-sky-400/20 to-cyan-500/10",
    icon: "text-sky-400",
    button:
      "bg-sky-400 text-black hover:bg-sky-300",
    ring: "ring-sky-400/20",
  },
};

export function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const [options, setOptions] =
    useState<AlertOptions | null>(
      null
    );

  const showAlert = useCallback(
    (opts: AlertOptions) => {
      setOptions(opts);
      setIsOpen(true);
    },
    []
  );

  const hideAlert = useCallback(() => {
    setIsOpen(false);

    if (options?.onClose) {
      options.onClose();
    }

    setTimeout(() => {
      setOptions(null);
    }, 200);
  }, [options]);

  const type =
    options?.type || "info";

  const styles = typeStyles[type];

  const DefaultIcon =
    type === "success"
      ? CheckCircle2
      : type === "error"
      ? ShieldAlert
      : type === "warning"
      ? AlertTriangle
      : Info;

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        hideAlert,
      }}
    >
      {children}

      {isOpen && options && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            onClick={hideAlert}
            className="absolute inset-0 bg-black/70 backdrop-blur-xl transition-opacity duration-300"
          />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            className={`relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0B12]/95 shadow-[0_25px_80px_rgba(0,0,0,0.65)] ring-1 ${styles.ring} animate-in fade-in zoom-in-95 duration-200`}
          >
            {/* macOS top bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              <button
                onClick={hideAlert}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close alert"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative p-8">
              {/* EVA inspired glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${styles.accent} opacity-60`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-8 flex justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-md">
                    <div
                      className={`${styles.icon}`}
                    >
                      {options.icon || (
                        <DefaultIcon className="h-10 w-10" />
                      )}
                    </div>

                    <div className="absolute inset-0 rounded-[24px] border border-white/5" />
                  </div>
                </div>

                {/* Image */}
                {options.image && (
                  <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={options.image}
                      alt="Alert image"
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="mb-8 text-center">
                  <h3
                    id="alert-title"
                    className="font-syne text-2xl font-semibold text-white"
                  >
                    {options.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {options.message}
                  </p>
                </div>

                {/* Action */}
                <button
                  onClick={hideAlert}
                  className={`flex h-12 w-full items-center justify-center rounded-2xl font-semibold transition-all duration-200 ${styles.button}`}
                >
                  {options.confirmText ||
                    "Continue"}
                </button>

                {/* Bottom detail */}
                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-zinc-600">
                  <div className="h-1 w-1 rounded-full bg-zinc-600" />
                  <span>
                    System status active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context =
    useContext(AlertContext);

  if (!context) {
    throw new Error(
      "useAlert must be used within AlertProvider"
    );
  }

  return context;
};
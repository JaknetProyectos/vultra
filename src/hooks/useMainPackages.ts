"use client";


import { mainPackagesEnglish, mainPackagesSpanish } from "@/data/plans";
import { useLocale } from "next-intl";

export function useMainPackages() {
    const locale = useLocale();
    const mainPackages = locale == "es" ? mainPackagesSpanish : mainPackagesEnglish;

    return { mainPackages }
}
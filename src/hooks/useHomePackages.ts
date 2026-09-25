"use client";

import { homepagePackagesEnglish, homepagePackagesSpanish } from "@/data/plans";
import { useLocale } from "next-intl";

export function useHomePackages() {
    const locale = useLocale();
    const homepagePackages = locale == "es" ? homepagePackagesSpanish : homepagePackagesEnglish;

    return { homepagePackages }
}
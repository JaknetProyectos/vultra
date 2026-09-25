"use client";

import { consultingServicesEnglish, consultingServicesSpanish } from "@/data/plans";
import { useLocale } from "next-intl";

export function useConsultingServices() {
    const locale = useLocale();
    const consultingServices = locale == "es" ? consultingServicesSpanish : consultingServicesEnglish;

    return { consultingServices }
}
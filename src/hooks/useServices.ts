"use client";

import { servicesEnglish, servicesSpanish } from "@/data/services";
import { useLocale } from "next-intl";

export function useServices() {
    const locale = useLocale();
    const services = locale == "es" ? servicesSpanish : servicesEnglish;

    return { services }
}
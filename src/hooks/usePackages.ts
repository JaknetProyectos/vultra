"use client";

import { consultingServicesEnglish, consultingServicesSpanish, mainPackagesEnglish, mainPackagesSpanish, Package } from "@/data/plans";
import { useLocale } from "next-intl";



export function usePackages() {
    const locale = useLocale();
    const consultingServices = locale == "es" ? consultingServicesSpanish : consultingServicesEnglish;
    const mainPackages = locale == "es" ? mainPackagesSpanish : mainPackagesEnglish;

    const packages: Package[] = []

    for (const service of consultingServices) {
        packages.push({
            id: service.id,
            name: service.name,
            price: service.price,
            features: service.features
        })
    }

    for (const pack of mainPackages) {
        packages.push({
            id: pack.id,
            name: pack.name,
            price: pack.price,
            features: pack.features
        })
    }

    return {packages};
}
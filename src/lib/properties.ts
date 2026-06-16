import type { Dictionary } from "@/i18n/dictionaries/en";
import { propertyImages } from "./property-images";

export type PropertyItem = Dictionary["properties"]["items"][number];
export type Property = PropertyItem & { image: (typeof propertyImages)[string] };

export function getProperties(dict: Dictionary): Property[] {
  return dict.properties.items.map((item) => ({
    ...item,
    image: propertyImages[item.slug],
  }));
}

export function getProperty(dict: Dictionary, slug: string): Property | undefined {
  return getProperties(dict).find((p) => p.slug === slug);
}

export function getPropertiesByArea(dict: Dictionary, areaSlug: string): Property[] {
  return getProperties(dict).filter((p) => p.areaSlug === areaSlug);
}

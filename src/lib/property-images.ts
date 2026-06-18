import type { StaticImageData } from "next/image";
import coastal from "@/assets/images/home-coastal.jpg";
import living from "@/assets/images/home-living.jpg";
import modern from "@/assets/images/home-modern.jpg";
import interior from "@/assets/images/home-interior.jpg";
import pool from "@/assets/images/home-pool.jpg";
import kitchen1 from "@/assets/images/kitchen1.jpg";
import living2 from "@/assets/images/living2.jpg";
import bedroom1 from "@/assets/images/bedroom1.jpg";
import bathroom1 from "@/assets/images/bathroom1.jpg";
import dining1 from "@/assets/images/dining1.jpg";
import bedroom2 from "@/assets/images/bedroom2.jpg";
import interior2 from "@/assets/images/interior2.jpg";
import exterior2 from "@/assets/images/exterior2.jpg";

/** Multiple images per property — first item is the primary/cover. */
export const propertyGalleries: Record<string, StaticImageData[]> = {
  "saltwater-penthouse": [coastal, living2, kitchen1, bedroom1, bathroom1],
  "north-light-apartment": [living, interior2, kitchen1, bedroom2, bathroom1],
  "ironbark-villa": [modern, dining1, living2, bedroom1, exterior2],
  "gallery-loft": [interior, interior2, kitchen1, bedroom2],
  "esplanade-villa": [pool, coastal, living2, bedroom1, bathroom1],
};

/** Cover image, keyed by slug. */
export const propertyImages: Record<string, StaticImageData> = Object.fromEntries(
  Object.entries(propertyGalleries).map(([slug, imgs]) => [slug, imgs[0]]),
);

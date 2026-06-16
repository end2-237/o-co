import type { StaticImageData } from "next/image";
import coastal from "@/assets/images/home-coastal.jpg";
import living from "@/assets/images/home-living.jpg";
import modern from "@/assets/images/home-modern.jpg";
import interior from "@/assets/images/home-interior.jpg";
import pool from "@/assets/images/home-pool.jpg";

/** Property hero image, keyed by slug. */
export const propertyImages: Record<string, StaticImageData> = {
  "saltwater-penthouse": coastal,
  "north-light-apartment": living,
  "ironbark-villa": modern,
  "gallery-loft": interior,
  "esplanade-villa": pool,
};

export const galleryImages: StaticImageData[] = [
  coastal,
  living,
  modern,
  interior,
  pool,
];

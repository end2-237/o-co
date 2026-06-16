import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";
import { Hero } from "@/components/sections/Hero";
import { Immersive } from "@/components/sections/Immersive";
import { Showcase } from "@/components/sections/Showcase";
import { Marquee } from "@/components/sections/Marquee";
import { Studio } from "@/components/sections/Studio";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Reels } from "@/components/sections/Reels";
import { Approach } from "@/components/sections/Approach";
import { Team } from "@/components/sections/Team";
import { Areas } from "@/components/sections/Areas";
import { CTA } from "@/components/sections/CTA";
import { Reveals } from "@/components/ui/Reveals";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const counts = Object.fromEntries(
    dict.areas.list.map((a) => [
      a.slug,
      dict.properties.items.filter((p) => p.areaSlug === a.slug).length,
    ]),
  );

  return (
    <>
      <Hero t={dict.hero} />
      <Immersive t={dict.immersive} />
      <Showcase t={dict.properties} locale={locale} />
      <Marquee items={dict.marquee} />
      <Studio t={dict.agency} />
      <Services t={dict.services} />
      <Testimonials t={dict.testimonials} />
      <Reels t={dict.reels} />
      <Approach t={dict.process} />
      <Team t={dict.team} />
      <Areas t={dict.areas} locale={locale} counts={counts} />
      <CTA t={dict.cta} form={dict.form} />
      <Reveals />
    </>
  );
}

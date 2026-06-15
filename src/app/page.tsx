import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Studio } from "@/components/sections/Studio";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { CTA } from "@/components/sections/CTA";

/**
 * O&CO Homes landing page. The hero leads, followed by supporting sections
 * that build credibility and funnel toward the contact CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Studio />
      <Services />
      <Approach />
      <CTA />
    </>
  );
}

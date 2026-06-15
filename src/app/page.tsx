import { Hero } from "@/components/sections/Hero";
import { Immersive } from "@/components/sections/Immersive";
import { Showcase } from "@/components/sections/Showcase";
import { Marquee } from "@/components/sections/Marquee";
import { Studio } from "@/components/sections/Studio";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { CTA } from "@/components/sections/CTA";

/**
 * O&CO Homes landing page. The cinematic hero leads into an immersive,
 * emotional band and a home showcase, followed by supporting sections that
 * build credibility and funnel toward the contact CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Immersive />
      <Showcase />
      <Marquee />
      <Studio />
      <Services />
      <Approach />
      <CTA />
    </>
  );
}

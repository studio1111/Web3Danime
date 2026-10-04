import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

export default function App() {
  return (
    <main>
      <CinematicHero
        brandName="Web3Danime"
        tagline1="Build the future,"
        tagline2="not just another site."
        cardHeading="Immersive by design."
        metricValue={365}
        metricLabel="Days creating"
        ctaHeading="Make it cinematic."
        ctaDescription="A high-impact landing hero with depth, motion, responsive layout, and tactile UI."
      />
    </main>
  );
}
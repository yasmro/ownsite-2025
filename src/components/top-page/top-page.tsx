import { DotWaveCanvas } from "../canvas";
import AboutMeSection from "./about-me-section";
import HeroSection from "./hero-section";

export default function TopPage() {
  return (
    <main className="relative">
      <div className="fixed w-screen h-screen top-0 left-0 -z-10 inset-0 blur-[4px]">
        <DotWaveCanvas />
      </div>
      <HeroSection />
      <AboutMeSection />
    </main>
  );
}

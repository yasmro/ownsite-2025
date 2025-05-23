import { DotWaveCanvas } from "./canvas";
import { Button } from "./ui/button";

export default function TopPage() {
  return (
    <main className="relative min-h-[300vh] bg-white text-black">
      <div className="fixed inset-0 z-0 blur-[2px]">
        <DotWaveCanvas />
      </div>
      <div className="relative z-10">
        <div className="h-screen flex items-center justify-center">
          <div className="mx-auto text-center">
            <img
              src="/images/kyoushindohaku2.png"
              className="mix-blend-multiply dark:mix-blend-difference dark:invert dark:grayscale"
              loading="lazy"
              width={132}
              height={437}
              alt="Kyoshindohaku"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

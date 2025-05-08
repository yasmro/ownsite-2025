import { DotWaveCanvas } from "./canvas";
import { Button } from "./ui/button";

export default function TopPage() {
  return (
    <main className="relative min-h-[300vh] bg-white text-black">
      <div className="fixed inset-0 z-0 blur-[2px]">
        <DotWaveCanvas />
      </div>
      <div className="relative">
        <div className="h-screen flex items-center justify-center">
          <div className="container px-8 text-center">
            <img
              src="/public/images/kyoushindohaku2.png"
              className="mix-blend-multiply dark:bg-blend-multiply dark:mix-blend-multiply"
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

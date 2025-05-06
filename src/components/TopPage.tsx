import { DotWaveCanvas } from "./canvas";
import { WaveParticles } from "./canvas/WaveParticle/WaveParticle";
import { Button } from "./ui/button";

export default function TopPage() {
  return (
    <main className="relative min-h-[300vh] bg-white text-black">
      <div className="fixed inset-0 z-0 blur-[2px]">
        <DotWaveCanvas />
      </div>
      <div className="relative z-10">
        <div className="h-screen flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              ドットの波の世界へ
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80">
              スクロールして、ドットの波がどのように反応するか体験してください
            </p>
            <a href="/test">
              <Button>Test</Button>
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="h-screen flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              ドットの波の世界へ
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80">
              スクロールして、ドットの波がどのように反応するか体験してください
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="h-screen flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              ドットの波の世界へ
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80">
              スクロールして、ドットの波がどのように反応するか体験してください
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="h-screen flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              ドットの波の世界へ
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80">
              スクロールして、ドットの波がどのように反応するか体験してください
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="h-screen flex items-center justify-center">
          <div className="container px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              ドットの波の世界へ
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80">
              スクロールして、ドットの波がどのように反応するか体験してください
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

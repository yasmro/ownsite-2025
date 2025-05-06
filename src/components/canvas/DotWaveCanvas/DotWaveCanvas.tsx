import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

interface Dot {
  x: number;
  y: number;
  baseY: number;
  size: number;
  speed: number;
  amplitude: number;
}

export function DotWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);

  // Lenisからスクロール位置を取得
  useLenis(({ scroll }) => {
    scrollYRef.current = scroll;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // キャンバスをウィンドウサイズに合わせる
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots(); // リサイズ時にドットを再初期化
    };

    // ドットの初期化
    const initDots = () => {
      const dots: Dot[] = [];
      const dotCount = Math.floor(canvas.width / 15); // ドットの数を画面幅に応じて調整
      const dotSize = 3; // ドットの基本サイズ

      for (let i = 0; i < dotCount; i++) {
        for (let j = 0; j < 10; j++) {
          // 複数の波を作るために行を追加
          const x = (canvas.width / dotCount) * i;
          const baseY = canvas.height / 2 + j * 40 - 180; // 波の基準位置
          dots.push({
            x,
            y: baseY,
            baseY,
            size: dotSize - j * 0.2, // 行によってサイズを少し変える
            speed: 0.05 + Math.random() * 0.05, // 各ドットの速度をランダムに
            amplitude: 20 + Math.random() * 10, // 各ドットの振幅をランダムに
          });
        }
      }
      dotsRef.current = dots;
    };

    // アニメーションの描画
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // スクロール係数（スクロールに応じて波の動きを変化させる）
      const scrollFactor = scrollYRef.current * 0.001;

      // ドットを描画
      dotsRef.current.forEach((dot, index) => {
        const row = Math.floor(index / Math.floor(canvas.width / 15));
        const waveOffset = row * 0.5; // 各行の波のオフセット

        // スクロールに応じて波の振幅と周波数を変化させる
        const amplitudeFactor = 1 + scrollFactor * 2;
        const frequencyFactor = 1 + scrollFactor * 0.5;

        // 波の計算
        const wave =
          Math.sin(
            time * 0.001 * dot.speed +
              dot.x * 0.01 * frequencyFactor +
              waveOffset
          ) *
          dot.amplitude *
          amplitudeFactor;

        // ドットの位置を更新
        dot.y = dot.baseY + wave;

        // ドットの色をスクロール位置に応じて変化させる
        const hue = (240 + scrollFactor * 60) % 360; // 青から紫へのグラデーション
        const lightness = 50 + Math.sin(time * 0.001 + dot.x * 0.01) * 20;

        // ドットを描画
        ctx.fillStyle = `hsla(${hue}, 80%, ${lightness}%, 0.8)`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // 初期化とアニメーション開始
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    // イベントリスナーの設定
    window.addEventListener("resize", resizeCanvas);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

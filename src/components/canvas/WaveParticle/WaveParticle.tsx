"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import type * as THREE from "three";
import { useLenis } from "lenis/react";

function ParticleWave() {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollData = useRef({
    scrollY: 0,
    scrollSpeed: 0,
    lastScrollY: 0,
    lastTime: 0,
    normalizedScroll: 0,
  });

  // Lenisからスクロール位置を取得
  useLenis(({ scroll, velocity, limit }) => {
    scrollData.current.lastScrollY = scrollData.current.scrollY;
    scrollData.current.scrollY = scroll;
    scrollData.current.scrollSpeed = Math.abs(velocity) * 0.05;
    scrollData.current.lastTime = Date.now();

    // スクロール位置を0〜1の範囲に正規化
    scrollData.current.normalizedScroll = Math.min(scroll / limit, 1);
  });

  // パーティクルの数と配置を設定
  const cols = 60;
  const rows = 40;
  const particleCount = cols * rows;

  // パーティクルのジオメトリとマテリアルを作成
  const {
    positions,
    colors,
    initialPositions,
    circlePositions,
    spiralPositions,
    randomPositions,
  } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const circlePositions = new Float32Array(particleCount * 3);
    const spiralPositions = new Float32Array(particleCount * 3);
    const randomPositions = new Float32Array(particleCount * 3);

    // 1. 初期格子状配置
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const u = x / (cols - 1);
        const v = y / (rows - 1);

        // グリッド上に均等に配置
        const posX = (u - 0.5) * 2 * 4; // x座標 (-4 から 4)
        const posY = (v - 0.5) * 2 * 2.5; // y座標 (-2.5 から 2.5)
        const posZ = 0; // z座標（2D表現のため0に固定）

        initialPositions[i] = posX;
        initialPositions[i + 1] = posY;
        initialPositions[i + 2] = posZ;

        // 初期位置をコピー
        positions[i] = posX;
        positions[i + 1] = posY;
        positions[i + 2] = posZ;

        // 初期色（青系のグラデーション）
        colors[i] = 0.1 + u * 0.1;
        colors[i + 1] = 0.3 + v * 0.2;
        colors[i + 2] = 0.7 + (u + v) * 0.2;

        i += 3;
      }
    }

    // 2. 円形配置
    i = 0;
    for (let j = 0; j < particleCount; j++) {
      // パーティクルを同心円上に配置
      const segment = Math.floor(j / 30); // 30個のパーティクルで1つの円を形成
      const indexInSegment = j % 30;
      const angle = (indexInSegment / 30) * Math.PI * 2;
      const radius = 0.5 + segment * 0.15; // 円の半径を徐々に大きく

      circlePositions[i] = Math.cos(angle) * radius * 4;
      circlePositions[i + 1] = Math.sin(angle) * radius * 2.5;
      circlePositions[i + 2] = 0;

      i += 3;
    }

    // 3. 螺旋配置
    i = 0;
    for (let j = 0; j < particleCount; j++) {
      // パーティクルを螺旋状に配置
      const angle = j * 0.1;
      const radius = 0.1 + j * 0.005;

      spiralPositions[i] = Math.cos(angle) * radius * 4;
      spiralPositions[i + 1] = Math.sin(angle) * radius * 2.5;
      spiralPositions[i + 2] = 0;

      i += 3;
    }

    // 4. ランダム配置
    i = 0;
    for (let j = 0; j < particleCount; j++) {
      // パーティクルをランダムに配置
      randomPositions[i] = (Math.random() - 0.5) * 2 * 4;
      randomPositions[i + 1] = (Math.random() - 0.5) * 2 * 2.5;
      randomPositions[i + 2] = 0;

      i += 3;
    }

    return {
      positions,
      colors,
      initialPositions,
      circlePositions,
      spiralPositions,
      randomPositions,
    };
  }, [particleCount, cols, rows]);

  // スクロールスピードの減衰
  const decayScrollSpeed = (delta: number) => {
    const now = Date.now();
    const timeDiff = now - scrollData.current.lastTime;

    if (timeDiff > 100) {
      // スクロールが停止してから時間が経過したら、スピードを徐々に減衰
      scrollData.current.scrollSpeed *= 0.95;
    }

    return Math.max(0.1, Math.min(scrollData.current.scrollSpeed, 2));
  };

  // パーティクルの位置と色を更新
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const geometry = pointsRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;

    // スクロール位置に基づく速度係数（0.5〜3.0の範囲）
    const baseSpeed = 0.5;
    const scrollFactor = scrollData.current.scrollY * 0.0005;
    const scrollSpeed = decayScrollSpeed(delta);
    const speedFactor = baseSpeed + scrollFactor * 2 + scrollSpeed;

    // 波の振幅係数（スクロールに応じて変化）
    const amplitudeFactor = 0.15 + scrollFactor * 0.1;

    // スクロール位置に基づいて配置を変更（0〜1��範囲）
    const normalizedScroll = scrollData.current.normalizedScroll || 0;

    // 配置の変更段階を定義
    // 0.0-0.25: 格子状 → 円形
    // 0.25-0.5: 円形 → 螺旋
    // 0.5-0.75: 螺旋 → ランダム
    // 0.75-1.0: ランダム（固定）+ 波の高さ変化

    let i = 0;
    for (let j = 0; j < particleCount; j++) {
      let baseX,
        baseY,
        baseZ = 0;

      if (normalizedScroll < 0.25) {
        // 格子状から円形への変形
        const t = normalizedScroll * 4; // 0〜1に正規化
        baseX = initialPositions[i] * (1 - t) + circlePositions[i] * t;
        baseY = initialPositions[i + 1] * (1 - t) + circlePositions[i + 1] * t;
      } else if (normalizedScroll < 0.5) {
        // 円形から螺旋への変形
        const t = (normalizedScroll - 0.25) * 4; // 0〜1に正規化
        baseX = circlePositions[i] * (1 - t) + spiralPositions[i] * t;
        baseY = circlePositions[i + 1] * (1 - t) + spiralPositions[i + 1] * t;
      } else if (normalizedScroll < 0.75) {
        // 螺旋からランダムへの変形
        const t = (normalizedScroll - 0.5) * 4; // 0〜1に正規化
        baseX = spiralPositions[i] * (1 - t) + randomPositions[i] * t;
        baseY = spiralPositions[i + 1] * (1 - t) + randomPositions[i + 1] * t;
      } else {
        // ランダム配置（固定）
        baseX = randomPositions[i];
        baseY = randomPositions[i + 1];
      }

      // 波の計算（配置に関わらず適用）
      const distFromCenter = Math.sqrt(baseX * baseX + baseY * baseY) / 4;
      const angle = Math.atan2(baseY, baseX);

      // 複数の波を重ね合わせる
      const wave1 =
        Math.sin(distFromCenter * 5 + time * speedFactor) * amplitudeFactor;
      const wave2 =
        Math.sin(angle * 4 + time * speedFactor * 0.8) * amplitudeFactor * 0.8;
      const wave3 =
        Math.sin((distFromCenter + angle) * 3 + time * speedFactor * 1.2) *
        amplitudeFactor *
        0.6;

      // 波を合成
      const waveHeight = wave1 + wave2 + wave3;

      // 最終位置を設定
      positions[i] = baseX;
      positions[i + 1] = baseY;
      positions[i + 2] = waveHeight;

      // 波の高さと配置に基づいて色を変更
      const normalizedHeight =
        (waveHeight + amplitudeFactor * 3) / (amplitudeFactor * 6); // 0〜1に正規化

      // スクロール位置と波の高さに応じて色相を変化
      const hue = (0.6 + normalizedScroll * 0.4 + normalizedHeight * 0.2) % 1;
      const saturation = 0.7 + normalizedHeight * 0.3;
      const lightness = 0.5 + normalizedHeight * 0.3;

      // HSLからRGBに変換
      const { r, g, b } = hslToRgb(hue, saturation, lightness);
      colors[i] = r;
      colors[i + 1] = g;
      colors[i + 2] = b;

      i += 3;
    }

    // 位置と色の更新を通知
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={4}
        sizeAttenuation={false}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

// HSLからRGBへの変換関数
function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r, g, b };
}

// メインコンポーネント
export function WaveParticles() {
  return (
    <Canvas>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 5]}
        zoom={100}
        near={0.1}
        far={1000}
      />
      <ParticleWave />
    </Canvas>
  );
}

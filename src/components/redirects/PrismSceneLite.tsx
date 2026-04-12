"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Center, Preload } from "@react-three/drei";
import { Monolith } from "../v5/Monolith";
import { Suspense } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { SVGLoader } from "three-stdlib";
import { getAssetPath } from "@/lib/assets";

// Preload the SVG so the fetch starts immediately
if (typeof window !== "undefined") {
  useLoader.preload(SVGLoader, getAssetPath("/assets/brand/wg-logo-vectorized.svg"));
}

interface PrismSceneLiteProps {
  inverted: boolean;
}

function LiteSceneContent({ inverted }: PrismSceneLiteProps) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, 4]} intensity={0.4} />

      <Monolith inverted={inverted} />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
      />

      <Preload all />
    </>
  );
}

export function PrismSceneLite({ inverted }: PrismSceneLiteProps) {
  return (
    <div className="w-full h-full">
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <LiteSceneContent inverted={inverted} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

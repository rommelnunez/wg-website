"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Monolith } from "./Monolith";
import { Suspense } from "react";
import { ErrorBoundary } from "../ErrorBoundary";

interface PrismSceneProps {
    inverted: boolean;
}

function SceneContent({ inverted }: PrismSceneProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

            <Monolith inverted={inverted} />

            <Environment preset="city" />

            <OrbitControls
                autoRotate
                autoRotateSpeed={0.5}
                enableZoom={true}
                minDistance={4}
                maxDistance={12}
                enablePan={false}
            />
        </>
    );
}

export function PrismScene({ inverted }: PrismSceneProps) {
    return (
        <div className="w-full h-full">
            <ErrorBoundary>
                {/* gl={{ alpha: true }} allows the CSS background of the parent div to show through */}
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
                    <Suspense fallback={null}>
                        <SceneContent inverted={inverted} />
                    </Suspense>
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Monolith } from "./Monolith";
import { Suspense } from "react";

export function PrismScene() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#000000']} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    <Monolith />

                    {/* Environment Mapping using a preset for now, or use the video texture in V6 */}
                    <Environment preset="studio" />

                    {/* Subtle controls, mainly for debug, disabled zoom */}
                    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2 - 0.5} maxPolarAngle={Math.PI / 2 + 0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}

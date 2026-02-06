"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { Monolith } from "./Monolith";
import { Suspense } from "react";

export function PrismScene() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#000000']} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    <Monolith />

                    {/* Environment Mapping: City provides good high-contrast reflections for glass */}
                    <Environment preset="city" />

                    {/* Background Stars to show refraction */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {/* Unlocked Controls for interaction */}
                    <OrbitControls
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableZoom={true}
                        minDistance={4}
                        maxDistance={12}
                        enablePan={false}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

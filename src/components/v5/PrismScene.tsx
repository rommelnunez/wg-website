"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Monolith } from "./Monolith";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

export function PrismScene() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                    {/* Dark background Color */}
                    <color attach="background" args={['#000000']} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    <Monolith />

                    {/* Add environment for reflections on the glass surface itself */}
                    <Environment preset="city" />

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

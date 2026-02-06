"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useVideoTexture } from "@react-three/drei";
import { Monolith } from "./Monolith";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

function VideoBackground() {
    // Load the brand loop video
    const texture = useVideoTexture("/assets/brand/wg-brand-loop.mov", {
        muted: true,
        loop: true,
        start: true,
        playsInline: true,
    });

    // Desaturate the video texture slightly by using it on a material with a slight grey tint?
    // Or better, just render it 'as is' and let the glass handle the look.
    // We'll use a BackSide sphere to surround the scene.

    return (
        <mesh scale={[-1, 1, 1]}> {/* Invert scale to show on inside */}
            <sphereGeometry args={[20, 32, 32]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
                toneMapped={false}
            />
        </mesh>
    );
}

export function PrismScene() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                    {/* Dark background Color */}
                    <color attach="background" args={['#101010']} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    <VideoBackground />

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

"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Monolith } from "./Monolith";
import { Suspense } from "react";
import * as THREE from "three";
import { ErrorBoundary } from "../ErrorBoundary";

interface PrismSceneProps {
    inverted: boolean;
}

function SceneContent({ inverted }: PrismSceneProps) {
    useThree(({ scene }) => {
        // Smoothly transition background color
        if (scene.background instanceof THREE.Color) {
            const targetColor = inverted ? new THREE.Color('#ffffff') : new THREE.Color('#000000');
            scene.background.lerp(targetColor, 0.1);
        } else {
            scene.background = new THREE.Color('#000000');
        }
    });

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
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <Suspense fallback={null}>
                        {/* Initial Background Color */}
                        <color attach="background" args={['#000000']} />
                        <SceneContent inverted={inverted} />
                    </Suspense>
                </Canvas>
            </ErrorBoundary>
        </div>
    );
}

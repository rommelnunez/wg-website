"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Color } from "three";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function Monolith() {
    const meshRef = useRef<Mesh>(null);
    const { viewport } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle floating rotation
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + (state.pointer.x * 0.5);

            // Floating position
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group>
            <mesh ref={meshRef}>
                {/* The Monolith Shape - A rounded box or chamfered cube */}
                <boxGeometry args={[3, 5, 1]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={1024}
                    transmission={1}
                    roughness={0.0}
                    thickness={0.5}
                    ior={1.5}
                    chromaticAberration={0.06}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.3}
                    temporalDistortion={0.5}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#ffffff"
                    background={new Color("#000000")}
                />
            </mesh>

            {/* Internal "Etched" Text floating inside/behind */}
            <Text
                position={[0, 0, -0.6]}
                fontSize={0.8}
                // Fallback to standard if not loaded
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                WG
            </Text>
        </group>
    );
}

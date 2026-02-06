"use client";

import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Mesh, Color, Shape, ExtrudeGeometry } from "three";
import { MeshTransmissionMaterial, Center } from "@react-three/drei";
import { SVGLoader } from "three-stdlib";

export function Monolith() {
    const meshRef = useRef<Mesh>(null);

    // Load SVG from the public folder
    const svgData = useLoader(SVGLoader, '/assets/brand/wg-logo-vectorized.svg');

    // Process SVG paths into Shapes
    const shapes = useMemo(() => {
        // Explicitly cast path to any to avoid strict type issues with SVGLoader paths
        return svgData.paths.flatMap((path: any) =>
            path.toShapes(true)
        );
    }, [svgData]);

    // Create Extrude settings
    const extrudeSettings = useMemo(() => ({
        depth: 20, // Thick glass
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 4
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            // Slower, subtle floating rotation
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1 + (state.pointer.x * 0.1);
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group>
            <Center top>
                <mesh ref={meshRef} rotation={[Math.PI, 0, 0]} scale={0.001}> // Significantly smaller
                    <extrudeGeometry args={[shapes, extrudeSettings]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        resolution={1024}
                        transmission={1}
                        roughness={0.0}
                        thickness={2} // Increased thickness for glass effect
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
            </Center>
        </group>
    );
}

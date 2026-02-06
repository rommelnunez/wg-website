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
        depth: 120,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 2 // Reduced from 4 for mobile performance
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
            <Center>
                {/* Flip Y scale (-0.0015) to correct SVG coordinate system (upside down fix) */}
                <mesh ref={meshRef} rotation={[0, 0, 0]} scale={[0.0015, -0.0015, 0.0015]}>
                    <extrudeGeometry args={[shapes, extrudeSettings]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={6}    // Reduced from 16 to 6 for mobile stability
                        resolution={512} // Reduced from 1024 for mobile stability
                        transmission={0.4}
                        roughness={0.2}
                        thickness={10} // Tripled thickness (approx)
                        ior={1.5}
                        chromaticAberration={0.04}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.3}
                        temporalDistortion={0.0}
                        clearcoat={1}
                        attenuationDistance={0.5}
                        attenuationColor="#ffffff"
                        color="#ffffff"
                    />
                </mesh>
            </Center>
        </group>
    );
}

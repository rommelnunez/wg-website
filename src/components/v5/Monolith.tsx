"use client";

import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Mesh, Color, Shape, ExtrudeGeometry } from "three";
import { Center } from "@react-three/drei";
import { SVGLoader } from "three-stdlib";
import { getAssetPath } from "@/lib/assets";

export function Monolith() {
    const meshRef = useRef<Mesh>(null);

    // Load SVG from the public folder
    const svgData = useLoader(SVGLoader, getAssetPath('/assets/brand/wg-logo-vectorized.svg'));

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
        steps: 1, // Only 1 step for depth to save vertices
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 0 // Hard edges for max performance (and style)
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            // Faster, more noticeable floating rotation
            // Removed pointer influence suitable for "interactive mode via click/drag only" (OrbitControls handles drag)
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
        }
    });

    return (
        <group>
            <Center>
                {/* Flip Y scale (-0.0012) to correct SVG coordinate system (upside down fix), slightly smaller */}
                <mesh ref={meshRef} rotation={[0, 0, 0]} scale={[0.0012, -0.0012, 0.0012]}>
                    <extrudeGeometry args={[shapes, extrudeSettings]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        emissive="#ffffff" // Make it glow white
                        emissiveIntensity={0.5} // Adjust for "super white" brightness without losing all definition
                        transmission={0.4}
                        opacity={1}
                        metalness={0}
                        roughness={0.8} // High roughness for "Matte" look
                        ior={1.5}
                        thickness={10}
                        attenuationColor="#ffffff"
                        attenuationDistance={0.5}
                        clearcoat={0} // Removed shiny clearcoat
                        side={2} // DoubleSide
                    />
                </mesh>
            </Center>
        </group>
    );
}

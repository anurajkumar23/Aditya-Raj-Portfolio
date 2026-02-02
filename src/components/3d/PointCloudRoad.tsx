"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PointCloudRoad() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate constant random points
    const { positions, colors } = useMemo(() => {
        const count = 2000; // Number of points
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // X: Spread across the road width (-10 to 10)
            const x = (Math.random() - 0.5) * 20;
            // Y: Slight variation on ground level (-0.9 to -0.8)
            const y = -0.9 + Math.random() * 0.1;
            // Z: Spread along the road length (-50 to 50)
            const z = (Math.random() - 0.5) * 100;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color: mix of white and orange
            if (Math.random() > 0.8) {
                color.set("#FF6B00"); // Orange accent
            } else {
                color.set("#444444"); // Dark grey base
            }

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        // Move the points backward to simulate car moving forward
        // (Or points move forward relative to car if car is static in Z)
        // The car is relatively static in Z (mostly), so road moves towards +Z or -Z?
        // If car drives "forward" (usually -Z in Three.js default), terrain moves +Z.
        // Let's assume standard forward is -Z.

        const speed = 20 * delta; // Adjust speed
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < positions.length / 3; i++) {
            // Move Z
            positions[i * 3 + 2] += speed;

            // Reset if too close/behind camera
            if (positions[i * 3 + 2] > 20) {
                positions[i * 3 + 2] = -80; // Reset to far horizon
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

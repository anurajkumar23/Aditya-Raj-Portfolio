"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PointCloudPedestrians() {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors } = useMemo(() => {
        const pedCount = 10; // Number of pedestrians
        const pointsPerPed = 60;
        const totalPoints = pedCount * pointsPerPed;

        const positions = new Float32Array(totalPoints * 3);
        const colors = new Float32Array(totalPoints * 3);
        const color = new THREE.Color();

        for (let p = 0; p < pedCount; p++) {
            // Pedestrian position (sidewalk)
            const side = Math.random() > 0.5 ? 1 : -1;
            const pedX = side * (5 + Math.random() * 3); // 5-8 units away (closer than trees)
            const pedZ = (Math.random() - 0.5) * 80; // Spread along Z

            for (let i = 0; i < pointsPerPed; i++) {
                const index = (p * pointsPerPed + i) * 3;

                // Humanoid shape (rough cylinder)
                const height = Math.random() * 1.8; // Up to 1.8m
                const radius = 0.25;

                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * radius;

                const x = pedX + r * Math.cos(angle);
                const y = -0.9 + height;
                const z = pedZ + r * Math.sin(angle);

                positions[index] = x;
                positions[index + 1] = y;
                positions[index + 2] = z;

                // Color: Cyan/Blue (Classic Lidar Pedestrian color)
                if (Math.random() > 0.5) {
                    color.set("#00ffff"); // Cyan
                } else {
                    color.set("#0088ff"); // Blue
                }

                colors[index] = color.r;
                colors[index + 1] = color.g;
                colors[index + 2] = color.b;
            }
        }

        return { positions, colors };
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const speed = 20 * delta;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const count = positions.length / 3;

        for (let i = 0; i < count; i++) {
            // Move Z (Road relative motion)
            positions[i * 3 + 2] += speed;

            // Simple wrapping
            if (positions[i * 3 + 2] > 20) {
                positions[i * 3 + 2] -= 80;
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
                size={0.12}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
            />
        </points>
    );
}

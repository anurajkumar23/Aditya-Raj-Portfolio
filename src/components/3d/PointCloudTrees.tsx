"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PointCloudTrees() {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors } = useMemo(() => {
        const treeCount = 20; // Number of trees
        const pointsPerTree = 150;
        const totalPoints = treeCount * pointsPerTree;

        const positions = new Float32Array(totalPoints * 3);
        const colors = new Float32Array(totalPoints * 3);
        const color = new THREE.Color();

        for (let t = 0; t < treeCount; t++) {
            // Tree position (side of road)
            const side = Math.random() > 0.5 ? 1 : -1;
            const treeX = side * (10 + Math.random() * 15); // 10-25 units away from center
            const treeZ = (Math.random() - 0.5) * 100; // Spread along Z

            for (let i = 0; i < pointsPerTree; i++) {
                const index = (t * pointsPerTree + i) * 3;

                // Tree shape (simple cylinder/cone approximation)
                const height = Math.random() * 8; // Tree height up to 8 units
                const radius = (8 - height) * 0.3 * Math.random(); // Taper towards top

                const angle = Math.random() * Math.PI * 2;
                const r = Math.sqrt(Math.random()) * radius; // Uniform distribution in circle

                const x = treeX + r * Math.cos(angle);
                const y = -0.9 + height;
                const z = treeZ + r * Math.sin(angle);

                positions[index] = x;
                positions[index + 1] = y;
                positions[index + 2] = z;

                // Color: Greenish/Brownish Lidar style
                if (Math.random() > 0.7) {
                    color.set("#00ff00"); // Lidar Green return
                } else {
                    color.set("#004400"); // Dark Green
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
            positions[i * 3 + 2] += speed;

            // Simple wrapping for trees is harder because points belong to specific trees.
            // With this simple layout, we can just wrap points individually, but trees might "disintegrate" at the edge.
            // A better approach for individual points:
            if (positions[i * 3 + 2] > 20) {
                positions[i * 3 + 2] -= 100; // Wrap way back
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
                size={0.2}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
            />
        </points>
    );
}

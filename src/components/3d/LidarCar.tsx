"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function CarParticles() {
    const pointsRef = useRef<THREE.Points>(null);

    // Procedurally generate a car-like shape
    const particles = useMemo(() => {
        const count = 6000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            let x, y, z;
            const section = Math.random();

            if (section < 0.25) {
                // Wheels (Detailed)
                const wheelX = Math.random() < 0.5 ? -1.4 : 1.4;
                const wheelZ = Math.random() < 0.5 ? -2.0 : 2.0;
                const theta = Math.random() * Math.PI * 2;
                const r = 0.6 * Math.sqrt(Math.random());
                const width = (Math.random() - 0.5) * 0.4;
                x = wheelX + width;
                y = 0.6 + r * Math.sin(theta);
                z = wheelZ + r * Math.cos(theta);
            } else if (section < 0.65) {
                // Main Body (Sporty low profile)
                x = (Math.random() - 0.5) * 4.0;
                y = 0.8 + Math.random() * 0.6; // Lower to ground
                z = (Math.random() - 0.5) * 5.5;

                // Sculpting the hood/trunk
                if (Math.abs(z) > 1.5) y *= 0.8;
            } else {
                // Cabin (Aerodynamic)
                x = (Math.random() - 0.5) * 2.8;
                z = (Math.random() - 0.5) * 3.0;
                const dome = Math.cos((z / 1.5) * Math.PI * 0.5);
                y = 1.4 + Math.random() * 0.8 * (dome > 0 ? dome : 0);
            }

            positions[i * 3] = x;
            positions[i * 3 + 1] = y - 1.2; // Center vertically
            positions[i * 3 + 2] = z;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Automatic idle rotation
        pointsRef.current.rotation.y += 0.001;

        // Scroll-driven interaction (Direct DOM access for performance)
        const scrollY = window.scrollY;
        const rotationSpeed = 0.0005;

        // Add scroll influence to rotation
        pointsRef.current.rotation.x = Math.sin(scrollY * rotationSpeed) * 0.2;
        pointsRef.current.rotation.z = Math.cos(scrollY * rotationSpeed) * 0.1;

        // Pulse/Wobble effect
        const time = state.clock.elapsedTime;
        pointsRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    });

    return (
        <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#FF6B00"
                size={0.04}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.9}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export default function LidarCar() {
    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
            <Canvas camera={{ position: [6, 2, 6], fov: 50 }}>
                <fog attach="fog" args={['#000000', 5, 20]} />
                <ambientLight intensity={0.5} />

                <CarParticles />

                {/* Ambient environment particles */}
                <Points positions={new Float32Array(500 * 3).map(() => (Math.random() - 0.5) * 30)} stride={3}>
                    <PointMaterial color="#333" size={0.05} opacity={0.4} sizeAttenuation />
                </Points>
            </Canvas>
        </div>
    );
}

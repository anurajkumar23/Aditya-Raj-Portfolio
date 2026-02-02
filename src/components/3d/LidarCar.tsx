"use client";

import { useRef, useLayoutEffect, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float, Grid } from "@react-three/drei";
import * as THREE from "three";
import TopLoadingBar from "@/components/TopLoadingBar";
import PointCloudRoad from "./PointCloudRoad";
import PointCloudTrees from "./PointCloudTrees";
import PointCloudPedestrians from "./PointCloudPedestrians";

function FerrariModel() {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb");
    const [hasEntered, setHasEntered] = useState(false);
    const wheelsRef = useRef<THREE.Mesh[]>([]);

    useLayoutEffect(() => {
        scene.traverse((obj: any) => {
            if (obj.isMesh) {
                // Store wheel references for rotation
                const nameLower = obj.name.toLowerCase();
                if (nameLower.includes("wheel") && obj.geometry) {
                    wheelsRef.current.push(obj);
                }

                // Apply different materials based on part names
                if (obj.name.includes("body") || obj.name === "carbon_fibre_shield") {
                    obj.material = new THREE.MeshPhysicalMaterial({
                        color: "#FF6B00",
                        emissive: "#000000",
                        metalness: 0.6,
                        roughness: 0.2,
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.03,
                        reflectivity: 1.0,
                    });
                } else if (obj.name.includes("glass") || obj.name.includes("window")) {
                    obj.material = new THREE.MeshPhysicalMaterial({
                        color: "#000000",
                        metalness: 0.0, // Glass isn't metallic
                        roughness: 0.0,
                        transmission: 0.9, // High transmission for transparency
                        transparent: true,
                        opacity: 1, // Let transmission handle visibility
                        ior: 1.8, // Glass index of refraction
                    });
                } else if (obj.name.includes("rim") || obj.name.includes("wheel")) {
                    obj.material = new THREE.MeshStandardMaterial({
                        color: "#cccccc",
                        metalness: 0.9,
                        roughness: 0.2,
                    });
                } else {
                    // Default dark chrome details
                    obj.material = new THREE.MeshStandardMaterial({
                        color: "#111111",
                        metalness: 0.8,
                        roughness: 0.4,
                    });
                }
            }
        });

        // Trigger entrance animation after materials are set
        setTimeout(() => setHasEntered(true), 100);
    }, [scene]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Rotate wheels based on road speed (20 units/s)
        // Angular velocity = Linear Velocity / Radius
        // Approx wheel radius ~0.35 (scaled 1.1) -> 20 / 0.35 ≈ 57
        const rotationSpeed = 57 * delta;

        wheelsRef.current.forEach((wheel) => {
            wheel.rotation.x -= rotationSpeed;
        });

        // Entrance animation: Drive in from right
        if (!hasEntered) {
            const startX = 8; // Off-screen right
            const endX = 1.2; // Final position
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, hasEntered ? endX : startX, 0.05);
            groupRef.current.position.y = -0.8;
            groupRef.current.rotation.y = Math.PI; // Facing left while driving in
            return; // Skip scroll animation during entrance
        }

        // After entrance, do scroll-driven animation
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollMax > 0 ? Math.min(Math.max(window.scrollY / scrollMax, 0), 1) : 0;

        let targetPos = new THREE.Vector3(0, -0.6, 0);
        let targetRot = new THREE.Euler(0, 0, 0);

        if (scrollProgress < 0.25) {
            const t = scrollProgress / 0.25;
            targetPos.set(
                THREE.MathUtils.lerp(1.2, 3.5, t),
                -0.6,
                THREE.MathUtils.lerp(0, 0, t)
            );
            targetRot.set(0, THREE.MathUtils.lerp(Math.PI, Math.PI, t), 0);
        } else if (scrollProgress < 0.50) {
            const t = (scrollProgress - 0.25) / 0.25;
            targetPos.set(
                THREE.MathUtils.lerp(3.5, -3.5, t),
                -0.6,
                THREE.MathUtils.lerp(0, 1.5, t)
            );
            targetRot.set(0, THREE.MathUtils.lerp(Math.PI, Math.PI / 2, t), 0);
        } else if (scrollProgress < 0.75) {
            const t = (scrollProgress - 0.50) / 0.25;
            targetPos.set(
                THREE.MathUtils.lerp(-3.5, 0, t),
                -0.6,
                THREE.MathUtils.lerp(1.5, 0, t)
            );
            targetRot.set(0, THREE.MathUtils.lerp(Math.PI / 2, 0, t), 0);
        } else {
            const t = (scrollProgress - 0.75) / 0.25;
            targetPos.set(0, -0.6, THREE.MathUtils.lerp(0, -10, t));
            targetRot.set(0, 0, 0);
        }

        groupRef.current.position.lerp(targetPos, 0.08);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.x, 0.08);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.y, 0.08);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.z, 0.08);
    });

    return <primitive ref={groupRef} object={scene} scale={1.1} position={[8, -0.8, 0]} />;
}

export default function LidarCar() {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
            <Canvas camera={{ position: [5, 2, 5], fov: 45 }}>
                <fog attach="fog" args={['#050505', 5, 25]} />
                <ambientLight intensity={1.0} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} color="#ffffff" />
                <spotLight position={[-10, 5, -10]} angle={0.2} penumbra={1} intensity={1} color="#ff6b00" />

                <Suspense fallback={null}>
                    <FerrariModel />
                    <Environment preset="city" />
                    <Grid
                        renderOrder={-1}
                        position={[0, -0.85, 0]}
                        infiniteGrid
                        cellSize={0.6}
                        sectionSize={3}
                        fadeDistance={25}
                        sectionColor="#333"
                        cellColor="#111"
                    />
                    <PointCloudRoad />
                    <PointCloudTrees />
                    <PointCloudPedestrians />
                </Suspense>

                <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.8} far={10} color="#000000" />
            </Canvas>
        </div>
    );
}

// Preload the model
useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb");

"use client";

import { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float, Html } from "@react-three/drei";
import * as THREE from "three";

function FerrariModel() {
    const groupRef = useRef<THREE.Group>(null);
    // Use raw GitHub URL which is more reliable for CORS
    const { scene } = useGLTF("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb", true); // true enables draco

    useLayoutEffect(() => {
        // Enhance materials for that "showroom" look
        Object.values(scene.children).forEach((child: any) => {
            if (child.isMesh) {
                // Apply specific materials if needed, but the GLB usually comes with them.
                // We can tweak the body color if we want to match the portfolio theme (Orange/Primary)
                if (child.name.includes("body")) {
                    child.material = new THREE.MeshPhysicalMaterial({
                        color: "#ff6b00", // Portfolio Primary Orange
                        metalness: 0.6,
                        roughness: 0.2,
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.03,
                    });
                }
            }
        });

        // Traverse to find body parts if names aren't top level
        scene.traverse((obj: any) => {
            if (obj.isMesh && obj.name === "body") {
                obj.material = new THREE.MeshPhysicalMaterial({
                    color: "#ff6b00", // Portfolio Primary Orange
                    metalness: 0.6,
                    roughness: 0.2,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.03,
                });
            }
        });

    }, [scene]);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Scroll-driven path animation (Dora.ai style)
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(window.scrollY / scrollMax, 0), 1);

        // Keyframes logic adapted for the real model scale
        let targetPos = new THREE.Vector3(0, -0.6, 0); // Ground level roughly
        let targetRot = new THREE.Euler(0, 0, 0);

        if (scrollProgress < 0.25) {
            // Hero -> Experience (Move Right)
            const t = scrollProgress / 0.25;
            targetPos.set(
                THREE.MathUtils.lerp(0, 3.5, t),
                -0.6,
                THREE.MathUtils.lerp(0, 0, t)
            );
            // Start facing Front (Math.PI) and rotate to side
            targetRot.set(0, THREE.MathUtils.lerp(Math.PI + 0.5, Math.PI, t), 0);
        } else if (scrollProgress < 0.50) {
            // Experience -> Projects (Move Left)
            const t = (scrollProgress - 0.25) / 0.25;
            targetPos.set(
                THREE.MathUtils.lerp(3.5, -3.5, t),
                -0.6,
                THREE.MathUtils.lerp(0, 1.5, t)
            );
            targetRot.set(0, THREE.MathUtils.lerp(Math.PI, Math.PI / 2, t), 0);
        } else if (scrollProgress < 0.75) {
            // Projects -> Skills (Return Center)
            const t = (scrollProgress - 0.50) / 0.25;
            targetPos.set(
                THREE.MathUtils.lerp(-3.5, 0, t),
                -0.6,
                THREE.MathUtils.lerp(1.5, 0, t)
            );
            targetRot.set(0, THREE.MathUtils.lerp(Math.PI / 2, 0, t), 0);
        } else {
            // Skills -> Contact (Drive Away)
            const t = (scrollProgress - 0.75) / 0.25;
            targetPos.set(
                0,
                -0.6,
                THREE.MathUtils.lerp(0, -10, t)
            );
            targetRot.set(0, 0, 0);
        }

        // Smooth interpolation
        groupRef.current.position.lerp(targetPos, 0.08); // Slightly heavier feel for real car

        // Manual Euler rotation smoothing
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.x, 0.08);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.y, 0.08);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.z, 0.08);

        // Wheel rotation simulation (visual only)
        // Ideally we'd animate wheels but the whole car moving is fine for now
    });

    return <primitive ref={groupRef} object={scene} scale={0.9} />;
}

export default function LidarCar() {
    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
            <Canvas camera={{ position: [4, 1.5, 5], fov: 45 }} gl={{ antialias: true }} shadows>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                <Environment preset="city" />

                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
                        {/* Corrected scale for Ferrari model */}
                        <FerrariModel />
                    </Float>
                </Suspense>

                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.6} far={10} color="#000000" />
            </Canvas>
        </div>
    );
}

useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb");

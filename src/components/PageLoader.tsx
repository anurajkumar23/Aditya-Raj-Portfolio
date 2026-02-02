"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
    const { active, progress } = useProgress();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hide page content until 3D car is fully loaded
        if (progress === 100 && !active) {
            // Small delay for smooth transition
            const timer = setTimeout(() => setIsLoading(false), 300);
            return () => clearTimeout(timer);
        }
    }, [progress, active]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[9998] bg-[#050505] flex items-center justify-center"
                >
                    {/* Optional: Add your logo or brand here */}
                    <div className="text-center">
                        <div className="text-2xl font-bold mb-8">
                            Aditya<span className="text-[#FF6B00]">Raj</span>
                        </div>
                        <div className="text-sm text-white/40">
                            Loading Experience... {Math.round(progress)}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

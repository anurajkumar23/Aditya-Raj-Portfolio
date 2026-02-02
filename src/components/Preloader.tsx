"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const { active, progress } = useProgress();
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Only hide when progress is 100% AND active is false (loading done)
        if (progress === 100 && !active) {
            // Add a small delay for smoothness so it doesn't flash off instantly
            const timer = setTimeout(() => setShow(false), 800);
            return () => clearTimeout(timer);
        } else {
            setShow(true);
        }
    }, [progress, active]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* Logo or Brand */}
                    <div className="mb-8 font-bold text-2xl tracking-tighter text-white">
                        Aditya<span className="text-[#FF6B00]">Raj</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-[#FF6B00]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "tween", ease: "linear" }}
                        />
                    </div>

                    {/* Text Status */}
                    <div className="mt-4 font-mono text-xs text-white/50">
                        INITIALIZING SYSTEMS... {Math.round(progress)}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopLoadingBar() {
    const { active, progress } = useProgress();
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Show immediately when active
        if (active || progress < 100) {
            setShow(true);
        } else if (progress === 100 && !active) {
            // Hide after loading completes
            const timer = setTimeout(() => setShow(false), 600);
            return () => clearTimeout(timer);
        }
    }, [active, progress]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full h-1 bg-transparent z-[99999] pointer-events-none"
                >
                    <motion.div
                        className="h-full bg-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.8)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

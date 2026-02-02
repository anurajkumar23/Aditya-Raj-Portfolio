"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links with Lenis
        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a");
            if (!target) return;

            const href = target.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                lenis.scrollTo(element as HTMLElement, { offset: 0 });
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            lenis.destroy();
            document.removeEventListener("click", handleAnchorClick);
        };
    }, []);

    return null;
}

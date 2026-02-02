"use client";

import dynamic from "next/dynamic";
import TopLoadingBar from "@/components/TopLoadingBar";

const LidarCar = dynamic(() => import("@/components/3d/LidarCar"), { ssr: false });

export default function LidarBackground() {
    return (
        <>
            <TopLoadingBar />
            <LidarCar />
        </>
    );
}

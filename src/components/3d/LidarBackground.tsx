"use client";

import dynamic from "next/dynamic";

const LidarCar = dynamic(() => import("@/components/3d/LidarCar"), { ssr: false });

export default function LidarBackground() {
    return <LidarCar />;
}

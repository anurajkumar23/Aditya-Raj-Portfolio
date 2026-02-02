"use client";

import { motion } from "framer-motion";
import { Award, Code, Users } from "lucide-react";

const achievements = [
    {
        icon: Award,
        title: "Google Kickstart Round G",
        description: "Global Rank 5935",
        link: "#" // Add certificate link if available
    },
    {
        icon: Code,
        title: "Competitive Programming",
        description: "Solved 500+ algorithmic problems across platforms"
    },
    {
        icon: Users,
        title: "Training & Placement Representative",
        description: "MNNIT Allahabad"
    },
    {
        icon: Users,
        title: "Head Placement Coordinator",
        description: "CSE Department, UIT Burdwan"
    }
];

export default function Achievements() {
    return (
        <section id="achievements" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">Achievements & Leadership</h2>
                    <p className="text-gray-400 mb-6">Recognition and competitive programming milestones</p>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-black/50 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all"
                            >
                                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                                    <Icon className="text-primary" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                                <p className="text-gray-400 text-sm">{achievement.description}</p>
                                {achievement.link && (
                                    <a href={achievement.link} target="_blank" className="text-primary text-sm mt-2 inline-block hover:underline">
                                        View Certificate →
                                    </a>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

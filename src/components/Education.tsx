"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Education() {
    return (
        <section id="education" className="py-20 bg-zinc-950/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-black p-8 rounded-2xl border border-white/10 flex gap-4"
                    >
                        <div className="p-3 bg-primary/10 rounded-lg h-fit text-primary">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">M.Tech in Geoinformatics</h3>
                            <p className="text-gray-400 mb-2">Motilal Nehru National Institute of Technology Allahabad</p>
                            <p className="text-sm text-primary mb-4">2024 - 2026 (Current)</p>
                            <p className="text-sm text-gray-500">CGPA: 8.2</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-black p-8 rounded-2xl border border-white/10 flex gap-4"
                    >
                        <div className="p-3 bg-primary/10 rounded-lg h-fit text-primary">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">B.E in Computer Science</h3>
                            <p className="text-gray-400 mb-2">University Institute of Technology, Burdwan</p>
                            <p className="text-sm text-primary mb-4">2020 - 2024</p>
                            <p className="text-sm text-gray-500">CGPA: 8.63/10</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

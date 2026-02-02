"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

export default function Publications() {
    return (
        <section id="publications" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">Publications & Research</h2>
                    <p className="text-gray-400 mb-6">Academic contributions and conference presentations</p>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-black border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group"
                >
                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-primary/10 rounded-lg flex-shrink-0">
                            <BookOpen className="text-primary" size={32} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        PGVNet Architecture Deep Learning Framework
                                    </h3>
                                    <p className="text-primary font-medium mb-2">
                                        International Conference on Sensing and Modeling for Pedestrian Mobility and Safety
                                    </p>
                                    <p className="text-gray-400 mb-4">
                                        Published in Springer Nature • Presented at IIT Kanpur
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="text-gray-400 hover:text-primary transition-colors flex-shrink-0"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-6">
                                Accepted conference paper with oral presentation at a prestigious international conference.
                                The research focuses on advanced deep learning architectures for pedestrian mobility analysis and safety applications.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                                    Deep Learning
                                </span>
                                <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                                    Computer Vision
                                </span>
                                <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                                    Pedestrian Safety
                                </span>
                                <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                                    Springer Nature
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

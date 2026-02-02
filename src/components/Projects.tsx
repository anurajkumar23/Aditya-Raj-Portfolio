"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
    {
        title: "Intelligent Document Finder",
        description: "RAG-based system for enterprise document discovery. Built ingestion pipelines for multi-format documents with metadata extraction and vector indexing.",
        tech: ["Python", "FastAPI", "PostgreSQL", "ChromaDB", "Google Drive API"],
        link: "#",
        github: "#"
    },
    {
        title: "Netraveer AI",
        description: "Intelligent mobile assistant with playback, OCR, and object detection. Trained YOLO models for real-world inference and designed backend services.",
        tech: ["Flutter", "Python", "FastAPI", "YOLOv8", "OCR"],
        link: "#",
        github: "#"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 bg-zinc-950/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">Selected Projects</h2>
                    <p className="text-gray-400 mb-6">Showcasing AI-powered and data-driven solutions</p>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group bg-black border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex gap-4">
                                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.link} className="text-gray-400 hover:text-white transition-colors">
                                        <ArrowUpRight size={20} />
                                    </a>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

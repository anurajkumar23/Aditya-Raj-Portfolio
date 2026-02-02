"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
    {
        title: "Generative AI Certification",
        issuer: "Microsoft",
        description: "LLMs, Prompt Engineering, Azure AI Fundamentals",
        link: "#", // Add actual credential link
        skills: ["Generative AI", "Azure", "Prompt Engineering"]
    },
    {
        title: "Generative AI Program",
        issuer: "Turing",
        description: "Applied GenAI, RAG Systems, Model Deployment",
        link: "#", // Add actual certificate link
        skills: ["RAG Systems", "Model Deployment", "GenAI"]
    }
];

export default function Certifications() {
    return (
        <section id="certifications" className="py-20 bg-zinc-950/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">Certifications</h2>
                    <p className="text-gray-400 mb-6">Professional credentials and specialized training</p>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-black border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Award className="text-primary" size={24} />
                                </div>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-primary font-medium mb-3">{cert.issuer}</p>
                            <p className="text-gray-400 mb-6 leading-relaxed">{cert.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {cert.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full border border-primary/20"
                                    >
                                        {skill}
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

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const skills = [
    {
        category: "Data & Cloud Engineering",
        items: ["Apache Spark", "Kafka", "Airflow", "Hadoop", "Hive", "Databricks", "Snowflake", "BigQuery", "AWS", "Google Cloud"]
    },
    {
        category: "Backend & APIs",
        items: ["Python", "FastAPI", "Django", "SQL", "Microservices", "JWT", "PostgreSQL", "MongoDB"]
    },
    {
        category: "AI & Machine Learning",
        items: ["PyTorch", "YOLOv8", "LangChain", "LlamaIndex", "NLTK", "Computer Vision", "Generative AI"]
    },
    {
        category: "Languages & Tools",
        items: ["C++", "JavaScript", "Dart", "Docker", "Git", "Linux", "Flutter"]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="text-lg font-semibold text-white mb-6 border-b border-white/10 pb-2">
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item) => (
                                    <Link
                                        key={item}
                                        href="#projects"
                                        className="px-3 py-1.5 text-sm md:text-xs lg:text-sm text-gray-300 bg-white/5 rounded-md border border-white/10 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer block"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

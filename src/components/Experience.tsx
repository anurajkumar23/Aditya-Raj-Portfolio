"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        company: "Top Stack Pvt. Ltd.",
        role: "Data Engineering Instructor",
        period: "Feb 2025 - Current",
        description: "Conducting online classes for SQL, Hadoop, Hive, Kafka, Spark, Snowflake, AWS, and Big Data technologies. Training professionals and students in modern data engineering practices and cloud-native data solutions.",
        type: "Remote",
    },
    {
        company: "Promact Infotech",
        role: "Software Engineer Intern",
        period: "Dec 2023 - Apr 2024",
        description: "Designed and implemented client-facing AI-powered chatbots, improving user engagement and reducing manual support effort. Architected JWT-secured REST APIs enabling safe integration of generative AI services across five client applications.",
        type: "Vadodara",
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white">Professional Experience</h2>
                    <p className="text-gray-400 mb-6">Building scalable systems and AI solutions</p>
                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                </motion.div>

                <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-3 h-3 bg-primary rounded-full ring-4 ring-black" />

                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                        <p className="text-primary font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-2 md:mt-0 text-right">
                                        <p>{exp.period}</p>
                                        <p>{exp.type}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

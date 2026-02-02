"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";


export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center py-20 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-0 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
                <motion.div
                    initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Data Engineer
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                        DATA & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                            CLOUD
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg backdrop-blur-sm">
                        Architecting scalable pipelines and AI-driven solutions.
                        <span className="block text-primary/80 mt-2">Specializing in LiDAR & Autonomous Systems.</span>
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block shadow-[0_0_20px_rgba(255,107,0,0.4)] rounded-full"
                        >
                            <Link
                                href="#projects"
                                className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-orange-400 transition-all flex items-center gap-2"
                            >
                                View Work <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                        <motion.a
                            href="https://drive.google.com/file/d/1VCmJRKIfunMpVW3STPu427kbEbmmoglF/view?usp=drivesdk"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-md"
                        >
                            Download CV <Download size={20} />
                        </motion.a>
                    </div>

                    <div className="flex gap-8">
                        <a href="https://github.com/anurajkumar23" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                            <Github size={28} />
                        </a>
                        <a href="https://linkedin.com/in/aditya-raj" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin size={28} />
                        </a>
                        <a href="mailto:official.dhruvaditya@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                            <Mail size={28} />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest uppercase"
            >
                Scroll to Explore
            </motion.div>
        </section>
    );
}

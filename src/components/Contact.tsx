"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
    return (
        <footer id="contact" className="py-20 bg-black/60 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's work together.</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-md">
                            Open to opportunities in Data Engineering, Cloud Architecture, and AI Development.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <Mail className="text-primary" />
                                <a href="mailto:official.dhruvaditya@gmail.com" className="hover:text-white transition-colors">
                                    official.dhruvaditya@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <Phone className="text-primary" />
                                <span>+91-7079776796</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <MapPin className="text-primary" />
                                <span>India</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5"
                    >
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                <input type="email" placeholder="Email" className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <input type="text" placeholder="Subject" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                            <textarea rows={4} placeholder="Message" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" />
                            <button className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-orange-500 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
                    <p>© {new Date().getFullYear()} Aditya Raj. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

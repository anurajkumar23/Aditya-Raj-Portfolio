import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="text-white selection:bg-orange-500 selection:text-white relative z-10 w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Achievements />
      <Certifications />
      <Education />
      <Contact />
    </main>
  );
}

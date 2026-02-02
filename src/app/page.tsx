import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import LidarBackground from "@/components/3d/LidarBackground";

export default function Home() {
  return (
    <>
      <LidarBackground />
      <main className="text-white selection:bg-orange-500 selection:text-white relative z-10">
        <Navbar />
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}

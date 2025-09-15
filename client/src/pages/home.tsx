import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <div className="bg-background text-foreground antialiased">
      <StructuredData />
      <Header />
      <Hero />
      <About />
      <Services />
      <CaseStudies />
      <Contact />
      <Footer />
    </div>
  );
}

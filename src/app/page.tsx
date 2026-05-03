import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PageEntrance from "@/components/PageEntrance";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageEntrance>
        <main>
          <Hero />
          <About />
          <Work />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </PageEntrance>
    </>
  );
}

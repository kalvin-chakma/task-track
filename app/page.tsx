import { Navbar } from "./components/landing/navbar";
import { HeroSection } from "../app/components/landing/hero-section";
import { FeaturesSection } from "../app/components/landing/features-section";
import { PreviewSection } from "../app/components/landing/preview-section";
import { TechStackSection } from "../app/components/landing/tech-stack-section";
import { CTASection } from "../app/components/landing/cta-section";
import { Footer } from "../app/components/landing/footer";

export default function App() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="preview">
          <PreviewSection />
        </div>
        <TechStackSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

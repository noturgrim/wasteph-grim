import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollableLayout from "./components/layout/ScrollableLayout";
import HeroSection from "./components/sections/HeroSection";
import MessageSection from "./components/sections/MessageSection";
import ServicesSection from "./components/sections/ServicesSection";
import WasteStreamsShowcase from "./components/sections/WasteStreamsShowcase";
import ProcessSection from "./components/sections/ProcessSection";
import CTASection from "./components/sections/CTASection";

const App = () => {
  return (
    <ScrollableLayout>
      <Header />
      <main className="pt-20">
        <HeroSection />
        <MessageSection />
        <ServicesSection />
        <WasteStreamsShowcase />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </ScrollableLayout>
  );
};

export default App;

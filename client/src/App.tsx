import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
// import { ButtonShowcase } from "./components/ButtonShowcase";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      {/* <ButtonShowcase /> */}
      <Footer />
    </div>
  );
}
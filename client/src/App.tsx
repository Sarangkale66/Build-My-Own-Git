import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ButtonShowcase } from "./components/ButtonShowcase";
import { Footer } from "./components/Footer";
import { Auth } from "./components/Auth";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth'>('home');

  if (currentPage === 'auth') {
    return <Auth onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAuthClick={() => setCurrentPage('auth')} />
      <Hero onGetStarted={() => setCurrentPage('auth')} />
      <Features />
      <ButtonShowcase />
      <Footer />
    </div>
  );
}
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ButtonShowcase } from "./components/ButtonShowcase";
import { Footer } from "./components/Footer";
import { Auth } from "./components/Auth";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/Dashboard";
import { Repositories } from "./components/Repositories";
import { Timeline } from "./components/Timeline";
import { Issues } from "./components/Issues";
import { Projects } from "./components/Projects";
import { PullRequests } from "./components/PullRequests";
import { Settings } from "./components/Settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'dashboard'>('dashboard');
  const [dashboardPage, setDashboardPage] = useState('dashboard');

  const renderDashboardPage = () => {
    switch (dashboardPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'repositories':
        return <Repositories />;
      case 'timeline':
        return <Timeline />;
      case 'issues':
        return <Issues />;
      case 'projects':
        return <Projects />;
      case 'pull-requests':
        return <PullRequests />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (currentPage === 'auth') {
    return <Auth onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'dashboard') {
    return (
      <DashboardLayout 
        currentPage={dashboardPage}
        onPageChange={setDashboardPage}
        onBack={() => setCurrentPage('home')}
      >
        {renderDashboardPage()}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAuthClick={() => setCurrentPage('auth')} />
      <Hero onGetStarted={() => setCurrentPage('dashboard')} />
      <Features />
      <ButtonShowcase />
      <Footer />
    </div>
  );
}
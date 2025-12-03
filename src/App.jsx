import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact.jsx';
import Admin from '@/pages/Admin';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import MatrixBackground from '@/components/MatrixBackground';

const AppContent = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      <MatrixBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow overflow-x-hidden pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <SupabaseAuthProvider>
          <AppContent />
        </SupabaseAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
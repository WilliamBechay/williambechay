import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { translations, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const sectionIds = ['projects', 'skills'];
  const activeSection = useScrollSpy(sectionIds, { rootMargin: '-50% 0px -50% 0px' });

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
            }
        }, 100);
    } else {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    }
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getNavItemClass = (pathOrId) => {
    const baseClass = "transition-colors duration-200 font-medium";
    let isActive = false;
  
    // For direct routes
    if (pathOrId.startsWith('/') && location.pathname === pathOrId) {
        isActive = true;
    }
    
    // For scroll-to links on the homepage
    if (location.pathname === '/' && activeSection === pathOrId) {
        isActive = true;
    }
  
    if (isActive) {
        return cn(baseClass, "text-primary");
    } else {
        return cn(baseClass, "text-muted-foreground hover:text-foreground");
    }
  };


  if (!translations) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-primary"
            >
              William Bechay
            </motion.h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('projects')} className={getNavItemClass('projects')}>
              {translations.header.projects}
            </button>
            <button onClick={() => scrollToSection('skills')} className={getNavItemClass('skills')}>
              {translations.header.skills}
            </button>
            <button onClick={() => handleNavigate('/contact')} className={getNavItemClass('/contact')}>
              {translations.header.contact}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                aria-label="Toggle language"
              >
                <Languages className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={handleToggleTheme}
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Moon className="w-5 h-5 text-primary" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
             <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                aria-label="Toggle language"
              >
                <Languages className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={handleToggleTheme}
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                aria-label="Toggle theme"
              >
                 {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary" />
                  )}
              </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 border-t border-border"
          >
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('projects')} className={getNavItemClass('projects')}>
                {translations.header.projects}
              </button>
              <button onClick={() => scrollToSection('skills')} className={getNavItemClass('skills')}>
                {translations.header.skills}
              </button>
              <button onClick={() => handleNavigate('/contact')} className={getNavItemClass('/contact')}>
                {translations.header.contact}
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
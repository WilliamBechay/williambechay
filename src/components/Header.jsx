import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { translations, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const sectionIds = ['projects', 'skills'];
  const activeSection = useScrollSpy(sectionIds, { rootMargin: '-50% 0px -50% 0px' });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const baseClass = "relative px-4 py-2 rounded-lg transition-all duration-300 font-medium";
    let isActive = false;
  
    if (pathOrId.startsWith('/') && location.pathname === pathOrId) {
        isActive = true;
    }
    
    if (location.pathname === '/' && activeSection === pathOrId) {
        isActive = true;
    }
  
    if (isActive) {
        return cn(baseClass, "text-primary bg-primary/10 shadow-lg shadow-primary/20");
    } else {
        return cn(baseClass, "text-muted-foreground hover:text-foreground hover:bg-secondary/50");
    }
  };

  if (!translations) return null;

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "glass-strong shadow-2xl shadow-primary/5" 
        : "bg-transparent"
    )}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with animated gradient */}
          <Link to="/" className="cursor-pointer group">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x"
            >
              William Bechay
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')} 
              className={getNavItemClass('projects')}
            >
              {translations.header.projects}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('skills')} 
              className={getNavItemClass('skills')}
            >
              {translations.header.skills}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate('/contact')} 
              className={getNavItemClass('/contact')}
            >
              {translations.header.contact}
            </motion.button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-border mx-2" />
            
            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 group"
                aria-label="Toggle language"
              >
                <Languages className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleTheme}
                className="p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-5 h-5 text-white" />
                    ) : (
                      <Moon className="w-5 h-5 text-primary" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5 text-muted-foreground" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleTheme}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                className="flex flex-col gap-2 pt-4 mt-4 border-t border-border/50"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.button
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  onClick={() => scrollToSection('projects')} 
                  className={getNavItemClass('projects')}
                >
                  {translations.header.projects}
                </motion.button>
                
                <motion.button
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  onClick={() => scrollToSection('skills')} 
                  className={getNavItemClass('skills')}
                >
                  {translations.header.skills}
                </motion.button>
                
                <motion.button
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  onClick={() => handleNavigate('/contact')} 
                  className={getNavItemClass('/contact')}
                >
                  {translations.header.contact}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
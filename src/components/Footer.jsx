import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const Footer = () => {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();

  const getTranslation = (path, fallback) => {
    if (!translations) return fallback;
    return path.split('.').reduce((obj, key) => obj && obj[key], translations) || fallback;
  };

  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} William Bechay.</span>
            <span>{getTranslation('footer.crafted_with', 'Crafted with')}</span>
            <Heart className="w-4 h-4 text-primary" />
          </div>
          <span className="text-border">|</span>
          <Link to="/admin" className="hover:text-primary transition-colors duration-200">
            {getTranslation('header.admin', 'Admin')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
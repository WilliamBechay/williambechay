import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';

const Footer = () => {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();

  const getTranslation = (path, fallback) => {
    if (!translations) return fallback;
    return path.split('.').reduce((obj, key) => obj && obj[key], translations) || fallback;
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/WilliamBechay', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative glass-strong border-t border-border/50 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-gradient-x opacity-50" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              William Bechay
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl glass hover:bg-gradient-to-r hover:from-primary/20 hover:to-accent/20 transition-all duration-300 group"
                aria-label={social.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span>© {currentYear} William Bechay.</span>
              <span className="hidden sm:inline">{getTranslation('footer.crafted_with', 'Crafted with')}</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.div>
            </div>
            
            <span className="text-border hidden sm:inline">|</span>
            
            <Link 
              to="/admin" 
              className="hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
            >
              {getTranslation('header.admin', 'Admin')}
            </Link>
          </motion.div>

          {/* Additional tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted-foreground/70 italic text-center max-w-md"
          >
            Building digital experiences with modern technologies
          </motion.p>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-0 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
    </footer>
  );
};

export default Footer;
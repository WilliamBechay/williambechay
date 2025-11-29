import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const Hero = () => {
  const { translations } = useLanguage();
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!translations) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {translations.hero.heading}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {translations.hero.subheading}
          </p>
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {translations.hero.button}
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
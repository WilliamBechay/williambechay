import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

const IntroSection = () => {
  const { translations } = useLanguage();

  if (!translations?.home?.intro) return null;

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {translations.home.intro.greeting}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;

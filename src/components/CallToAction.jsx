import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

const CallToAction = () => {
  const { translations } = useLanguage();

  const getTranslation = (path, fallback) => {
    if (!translations) return fallback;
    return path.split('.').reduce((obj, key) => obj && obj[key], translations) || fallback;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="py-16 text-center"
    >
      <div className="container mx-auto px-4 space-y-2">
        <p className="text-muted-foreground">{getTranslation('home.helpText', 'Need help on a project? You can contact me.')}</p>
        <p className="text-sm font-medium text-foreground italic">{getTranslation('home.tagline', 'Can\'t build it, can\'t understand it.')}</p>
      </div>
    </motion.div>
  );
};

export default CallToAction;
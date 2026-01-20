import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { MessageCircle } from 'lucide-react';

const CallToAction = () => {
  const { translations } = useLanguage();

  const getTranslation = (path, fallback) => {
    if (!translations) return fallback;
    return path.split('.').reduce((obj, key) => obj && obj[key], translations) || fallback;
  };

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent animate-gradient-xy" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[600px] h-96 md:h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-4xl relative z-10"
      >
        <div className="glass rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center space-y-6 md:space-y-8">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg"
          >
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Let's Build Together
              </span>
            </h2>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              {getTranslation('home.helpText', 'Need help on a project? You can contact me.')}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-4 md:pt-6 border-t border-border/50"
          >
            <p className="text-sm md:text-base font-medium bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent italic">
              {getTranslation('home.tagline', "Can't build it, can't understand it.")}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
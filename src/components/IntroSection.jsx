import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';

const IntroSection = () => {
  const { translations } = useLanguage();
  const { theme } = useTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      container.style.setProperty('--mouse-x', `${xPercent}%`);
      container.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!translations?.home?.intro) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.02,
        duration: 0.02,
      },
    }),
  };

  const words = translations.home.intro.greeting.split(' ');

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .intro-container {
          position: relative;
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        .intro-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: float 6s ease-in-out infinite;
        }

        .intro-blob-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
          top: -100px;
          right: 10%;
          animation-delay: 0s;
        }

        .intro-blob-2 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%);
          bottom: -50px;
          left: 5%;
          animation-delay: 2s;
        }

        .intro-blob-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--accent)) 100%);
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 4s;
        }

        .intro-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .dark .intro-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .intro-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(0, 0, 0, 0.05),
            transparent 80%
          );
          pointer-events: none;
        }

        .dark .intro-glow {
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.05),
            transparent 80%
          );
        }

        .word-wrapper {
          display: inline-block;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="intro-blob intro-blob-1" />
        <div className="intro-blob intro-blob-2" />
        <div className="intro-blob intro-blob-3" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          ref={containerRef}
          className="intro-container intro-card rounded-2xl p-8 md:p-12 lg:p-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="intro-glow" />

          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                {translations.header.home}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed">
              {words.map((word, idx) => (
                <motion.span
                  key={idx}
                  className="word-wrapper"
                  custom={idx}
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap gap-2"
          >
            {['Backend', 'Infrastructure', 'DevEx', 'Open Source'].map(
              (tag, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-sm font-medium text-accent"
                >
                  {tag}
                </motion.div>
              )
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { label: '15+', value: 'Projects' },
              { label: '5+', value: 'Years XP' },
              { label: '100%', value: 'Passion' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-4 rounded-lg bg-background/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.label}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;

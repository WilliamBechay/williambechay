import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Wrench, ArrowRight } from 'lucide-react';

const Skills = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleContactClick = () => {
    navigate('/contact');
  };

  const skills = useMemo(() => translations?.skills?.items || [], [translations]);

  if (!translations?.skills) return null;

  const SkillIcon = ({ skill, index }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.05,
          type: "spring",
          stiffness: 200
        }}
        whileHover={{ 
          y: -12,
          scale: 1.1,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        className="flex flex-col items-center justify-center cursor-pointer group"
      >
        <motion.div
          className="relative glass rounded-2xl p-3 md:p-4 shadow-lg group-hover:shadow-primary/20 transition-shadow duration-300"
          whileHover={{ 
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          
          <img
            src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
            alt={skill.name}
            className="w-12 h-12 md:w-16 md:h-16 relative z-10"
          />
        </motion.div>
        
        <motion.p 
          className="text-xs md:text-sm font-semibold text-muted-foreground text-center mt-2 md:mt-3 group-hover:text-foreground transition-colors"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.05 + 0.2 }}
        >
          {skill.name}
        </motion.p>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/4 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-accent/10 border border-accent/20"
          >
            <Wrench className="w-3 h-3 md:w-4 md:h-4 text-accent" />
            <span className="text-xs md:text-sm font-medium text-accent">Technical Expertise</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-2">
            <span className="bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
              {translations.skills.heading}
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {translations.skills.subheading}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16 mb-12 md:mb-16">
          {skills.map((skill, index) => (
            <SkillIcon key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button 
            size="lg" 
            onClick={handleContactClick}
            className="group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg"
          >
            {translations.skills.contactButton}
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
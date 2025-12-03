import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Server, Database, Cloud, Brush, GitMerge, Terminal, Container as ContainerIcon } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconMap = {
  Code,
  Server,
  Database,
  Cloud,
  Brush,
  GitMerge,
  Terminal,
  Container: ContainerIcon,
};

const Skills = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleContactClick = () => {
    navigate('/contact');
  };

  const skills = useMemo(() => translations?.skills?.items || [], [translations]);

  if (!translations?.skills) return null;

  const SkillIcon = ({ skill }) => {
    const IconComponent = iconMap[skill.icon] || Code;

    return (
      <motion.div
        className="flex flex-col items-center justify-center cursor-pointer"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center bg-secondary shadow-lg text-primary mb-2"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <IconComponent className="w-7 h-7" />
        </motion.div>
        <p className="text-xs font-semibold text-muted-foreground text-center">{skill.name}</p>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {translations.skills.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {translations.skills.subheading}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
        >
          {skills.map((skill, index) => (
            <SkillIcon key={skill.name} skill={skill} />
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" onClick={handleContactClick}>
            {translations.skills.contactButton}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
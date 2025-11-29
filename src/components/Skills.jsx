import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Server, Database, Cloud, Brush, GitMerge, Terminal, Star, Key, Container as ContainerIcon } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  Code: Code,
  Server: Server,
  Database: Database,
  Cloud: Cloud,
  Brush: Brush,
  GitMerge: GitMerge,
  Terminal: Terminal,
  Star: Star,
  Key: Key,
  Container: ContainerIcon
};

const SkillCard = ({ skill, index }) => {
  const IconComponent = iconMap[skill.icon] || Code;

  const cardVariants = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
        delay: index * 0.05
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      className="group flex flex-col bg-background rounded-xl shadow-md hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden"
    >
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          {skill.experience && <Badge variant="secondary">{skill.experience}</Badge>}
        </div>
        <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-foreground">{skill.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground flex-grow">{skill.description}</p>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleContactClick = () => {
    navigate('/contact');
  };

  const categorizedSkills = useMemo(() => {
    if (!translations?.skills?.items) return {};
    return translations.skills.items.reduce((acc, skill) => {
      const category = skill.category || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }, [translations]);

  if (!translations?.skills) return null;

  const categoryOrder = ['frontend', 'backend', 'tools'];

  return (
    <section id="skills" className="py-16 lg:py-24 bg-secondary/30">
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

        <div className="space-y-12">
          {categoryOrder.map((categoryKey) => {
            const skills = categorizedSkills[categoryKey];
            const categoryName = translations.skills.categories[categoryKey];
            if (!skills || skills.length === 0) return null;

            return (
              <div key={categoryKey}>
                <motion.h3 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold mb-6 text-primary border-b-2 border-primary/30 pb-2"
                >
                  {categoryName}
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {skills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-16"
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
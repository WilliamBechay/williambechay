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
  const [activeSkill, setActiveSkill] = useState(null);

  const handleContactClick = () => {
    navigate('/contact');
  };

  const skills = useMemo(() => translations?.skills?.items || [], [translations]);

  if (!translations?.skills) return null;

  const wheelRadius = "clamp(140px, 22vw, 220px)";
  const centerSize = "clamp(160px, 40vw, 240px)";
  const itemSize = 80;

  const SkillItem = ({ skill, index }) => {
    const angle = (index / skills.length) * 360;
    const IconComponent = iconMap[skill.icon] || Code;
    const isActive = activeSkill?.name === skill.name;

    return (
      <motion.div
        className="absolute cursor-pointer flex flex-col items-center justify-center text-center"
        style={{
          width: itemSize,
          height: itemSize,
          top: `calc(50% - ${itemSize / 2}px)`,
          left: `calc(50% - ${itemSize / 2}px)`,
          transform: `rotate(${angle}deg) translateX(${wheelRadius}) rotate(${-angle}deg)`,
        }}
        onMouseEnter={() => setActiveSkill(skill)}
        onTouchStart={() => setActiveSkill(skill)}
        animate={isActive ? { scale: 1.2 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className={cn(
              "rounded-full flex items-center justify-center bg-secondary shadow-lg transition-all duration-300",
              isActive ? "w-16 h-16 sm:w-20 sm:h-20 bg-primary text-primary-foreground" : "w-12 h-12 sm:w-14 sm:h-14 text-primary"
            )}
            animate={isActive ? { y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" } : { y: 0, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <IconComponent className={isActive ? "w-7 h-7 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-6 sm:h-6"} />
          </motion.div>
          <motion.p 
            className="text-[10px] sm:text-xs font-semibold text-muted-foreground transition-colors duration-300 line-clamp-2 px-1"
            animate={isActive ? { color: "hsl(var(--primary))" } : { color: "hsl(var(--muted-foreground))" }}
          >
            {skill.name}
          </motion.p>
        </div>
      </motion.div>
    );
  };
  
  const displayedContent = activeSkill || {
    name: "My Tech Stack",
    description: "Hover over a skill to learn more.",
    isDefault: true,
  };

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {translations.skills.heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            {translations.skills.subheading}
          </p>
        </motion.div>

        <div 
          className="relative flex items-center justify-center w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
          onMouseLeave={() => setActiveSkill(null)}
          style={{
            perspective: "1000px"
          }}
        >
          <div className="relative" style={{ 
            width: `calc(2 * ${wheelRadius} + ${itemSize}px)`,
            height: `calc(2 * ${wheelRadius} + ${itemSize}px)`,
            maxWidth: "90vw",
            maxHeight: "90vw"
          }}>
            {skills.map((skill, index) => (
              <SkillItem key={skill.name} skill={skill} index={index} />
            ))}
          </div>
          
          <motion.div
            className="absolute z-10 text-center flex flex-col items-center justify-center bg-background/60 backdrop-blur-md rounded-full p-4 sm:p-6 shadow-2xl"
            style={{
              width: centerSize,
              height: centerSize,
            }}
            animate={activeSkill ? { boxShadow: "0 0 30px rgba(var(--primary), 0.2)" } : { boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="font-bold text-primary mb-2 sm:mb-3"
              animate={{ 
                fontSize: activeSkill?.name && !activeSkill.isDefault ? "24px" : "18px",
                color: activeSkill ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
              }}
              transition={{ duration: 0.2 }}
            >
              {displayedContent.name}
            </motion.h3>
            <motion.p 
              className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
              animate={{ opacity: activeSkill ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {displayedContent.description}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
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
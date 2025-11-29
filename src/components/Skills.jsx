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

  // Responsive values
  const wheelRadius = "clamp(150px, 40vw, 260px)";
  const centerSize = 180; // Mobile: 180px, will be overridden by Tailwind classes
  const itemSize = 70;

  const SkillItem = ({ skill, index }) => {
    const angle = (index / skills.length) * 360;
    const IconComponent = iconMap[skill.icon] || Code;

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
        whileHover={{ scale: 1.15, zIndex: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center bg-secondary shadow-lg transition-all duration-300 mb-2",
              activeSkill?.name === skill.name ? "bg-primary text-primary-foreground scale-110" : "text-primary"
            )}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <IconComponent className="w-7 h-7" />
          </motion.div>
          <p className="text-xs font-semibold text-muted-foreground transition-colors duration-300">
            {skill.name}
          </p>
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
    <section id="skills" className="py-20 lg:py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {translations.skills.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {translations.skills.subheading}
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center w-full" style={{ minHeight: "clamp(450px, 60vh, 700px)" }} onMouseLeave={() => setActiveSkill(null)}>
          {/* Conteneur pour les éléments autour de la roue */}
          <div 
            className="absolute"
            style={{ 
              width: `calc(${wheelRadius} * 2 + ${itemSize}px)`,
              height: `calc(${wheelRadius} * 2 + ${itemSize}px)`,
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          >
            {skills.map((skill, index) => (
              <SkillItem key={skill.name} skill={skill} index={index} />
            ))}
          </div>
          
          {/* Centre circulaire */}
          <div
            className="relative z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md rounded-full p-6 shadow-2xl w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60"
          >
            <h3 className={cn("font-bold text-primary mb-2 text-center", displayedContent.isDefault ? "text-sm sm:text-base md:text-lg" : "text-base sm:text-lg md:text-2xl")}>{displayedContent.name}</h3>
            <p className="text-xs sm:text-xs md:text-sm text-muted-foreground text-center line-clamp-3">{displayedContent.description}</p>
          </div>
        </div>

        <motion.div
          className="text-center mt-16 lg:mt-20"
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
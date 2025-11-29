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

  // 🔥 BREAKPOINT MOBILE
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches;

  // 🔥 RÉDUCTION DE LA ROUE SUR MOBILE
  const wheelRadius = isMobile ? "110px" : "clamp(120px, 22vw, 220px)";
  const itemSize = isMobile ? 55 : 90; // taille des éléments

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
              "rounded-full flex items-center justify-center bg-secondary shadow-lg transition-all duration-300 mb-2",
              isMobile ? "w-10 h-10" : "w-14 h-14",
              activeSkill?.name === skill.name
                ? "bg-primary text-primary-foreground scale-110"
                : "text-primary"
            )}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <IconComponent className={isMobile ? "w-5 h-5" : "w-7 h-7"} />
          </motion.div>

          <p className={cn("font-semibold text-muted-foreground transition-colors duration-300",
            isMobile ? "text-[10px]" : "text-xs"
          )}>
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

        <div
          className="relative flex items-center justify-center min-h-[450px] md:min-h-[550px]"
          onMouseLeave={() => setActiveSkill(null)}
        >
          <div
            className="absolute w-full h-full"
            style={{
              width: `calc(${wheelRadius} * 2 + ${itemSize}px)`,
              height: `calc(${wheelRadius} * 2 + ${itemSize}px)`
            }}
          >
            {skills.map((skill, index) => (
              <SkillItem key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          <div
            className={cn(
              "relative z-10 text-center flex flex-col items-center justify-center bg-background/60 backdrop-blur-md rounded-full p-6 shadow-2xl",
              isMobile ? "w-44 h-44" : "w-52 h-52 md:w-60 md:h-60"
            )}
          >
            <h3
              className={cn(
                "font-bold text-primary mb-2",
                displayedContent.isDefault
                  ? isMobile ? "text-md" : "text-lg md:text-xl"
                  : isMobile ? "text-lg" : "text-xl md:text-2xl"
              )}
            >
              {displayedContent.name}
            </h3>
            <p
              className={cn(
                "text-muted-foreground",
                isMobile ? "text-[10px]" : "text-xs md:text-sm"
              )}
            >
              {displayedContent.description}
            </p>
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

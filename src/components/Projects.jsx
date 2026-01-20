import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import { Code2, Sparkles } from 'lucide-react';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';

const Projects = () => {
  const { translations } = useLanguage();

  if (!translations || !translations.projects) return null;

  const projects = [
    {
      id: 1,
      title: 'Wiibec.com',
      description: translations.projects.wiibecDescription,
      imageSrc: wiibecImage,
      imageAlt: 'Wiibec.com project screenshot showing modern web interface',
      link: 'https://wiibec.com',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Supabase', 'Stripe'],
      tags: [],
    },
    {
      id: 2,
      title: 'Mindovest.com',
      description: translations.projects.mindovestDescription,
      imageSrc: mindovestImage,
      imageAlt: 'Mindovest.com investment platform interface',
      link: 'https://mindovest.com',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Supabase', 'Deno', 'TypeScript', 'SQL'],
      tags: [],
    },
  ];

  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4"
        >
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Code2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Featured Work</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-2">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              {translations.projects.heading}
            </span>
          </h2>
          
          {translations.projects.subheading && (
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {translations.projects.subheading}
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-4 md:space-y-6"
            >
              <ProjectCard project={project} index={index} />

              {/* Technologies with glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="glass rounded-xl md:rounded-2xl p-4 md:p-6 space-y-2 md:space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                  <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">
                    Tech Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-foreground rounded-full backdrop-blur-sm hover:scale-105 transition-transform cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
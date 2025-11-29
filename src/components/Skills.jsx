import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import wiibecImage from '@/assets/images/wiibec.png';
import mindovestImage from '@/assets/images/mindo.png';

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
      tags: [],
    },
    {
      id: 2,
      title: 'Mindovest.com',
      description: translations.projects.mindovestDescription,
      imageSrc: mindovestImage,
      imageAlt: 'Mindovest.com investment platform interface',
      link: 'https://mindovest.com',
      tags: [],
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {translations.projects.heading}
          </h2>
          {translations.projects.subheading && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {translations.projects.subheading}
            </p>
          )}
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
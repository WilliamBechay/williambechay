import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
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
    <section id="projects" className="py-8 px-4 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis">
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
            <div key={project.id} className="space-y-3">
              <ProjectCard project={project} index={index} />

              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
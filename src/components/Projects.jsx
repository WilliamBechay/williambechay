import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const translations = {
    projects: {
      heading: 'Mes Projets',
      subheading: 'Découvrez mes réalisations',
      wiibecDescription: 'Plateforme web moderne',
      mindovestDescription: 'Plateforme d\'investissement innovante',
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Wiibec.com',
      description: translations.projects.wiibecDescription,
      link: 'https://wiibec.com',
      frontend: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'JSX'],
      backend: ['Node.js', 'Supabase', 'Stripe'],
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Mindovest.com',
      description: translations.projects.mindovestDescription,
      link: 'https://mindovest.com',
      frontend: ['React', 'Vite', 'Tailwind CSS', 'Capacitor'],
      backend: ['Supabase', 'Deno', 'TypeScript', 'SQL'],
      color: 'from-emerald-500 to-teal-500',
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="space-y-3 group"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`h-32 bg-gradient-to-r ${project.color} group-hover:scale-105 transition-transform duration-300`} />
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </a>

              {/* Frontend */}
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  💻 Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.frontend.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  ⚙️ Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.backend.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
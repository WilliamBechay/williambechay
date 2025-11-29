import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative flex flex-col bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border"
    >
      <div className="aspect-video relative overflow-hidden bg-primary/20">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={project.imageAlt}
          src={project.imageSrc} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-card-foreground pr-4">
            {project.title}
          </h3>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-lg bg-secondary hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-200"
            aria-label={`Visit ${project.title}`}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.article>
  );
};

export default ProjectCard;
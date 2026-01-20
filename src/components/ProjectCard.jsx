import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col glass rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/10 border-2 border-transparent hover:border-primary/20 transition-all duration-500"
    >
      {/* Image container with overlay */}
      <div className="aspect-video relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        
        {/* Image */}
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover" 
          alt={project.imageAlt}
          src={project.imageSrc} 
        />
        
        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="p-5 md:p-8 flex flex-col flex-grow space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 md:gap-4">
          <div className="space-y-1 md:space-y-2 flex-grow">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
              {project.title}
            </h3>
            <div className="h-0.5 md:h-1 w-12 md:w-16 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-20 md:group-hover:w-24 transition-all duration-300" />
          </div>
          
          {/* CTA Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-110"
            aria-label={`Visit ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs px-2 md:px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.article>
  );
};

export default ProjectCard;
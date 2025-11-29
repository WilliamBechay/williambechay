import React from 'react';
import { Helmet } from 'react-helmet';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { useLanguage } from '@/components/LanguageProvider';

const Home = () => {
  const { translations } = useLanguage();

  if (!translations || !translations.home) return null;

  return (
    <>
      <Helmet>
        <title>{translations.home.meta.title}</title>
        <meta name="description" content={translations.home.meta.description} />
      </Helmet>
      {/* The Hero component has been removed as requested */}
      <Projects />
      <Skills />
    </>
  );
};

export default Home;
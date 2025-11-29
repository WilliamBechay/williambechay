import React from 'react';
import { Helmet } from 'react-helmet';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import CallToAction from '@/components/CallToAction';
import { useLanguage } from '@/components/LanguageProvider';
import WelcomeMessage from '@/components/WelcomeMessage';

const Home = () => {
  const { translations } = useLanguage();

  if (!translations || !translations.home) return null;

  return (
    <>
      <Helmet>
        <title>{translations.home.meta.title}</title>
        <meta name="description" content={translations.home.meta.description} />
      </Helmet>
      <WelcomeMessage />
      <Projects />
      <Skills />
      <CallToAction />
    </>
  );
};

export default Home;
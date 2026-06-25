import React from 'react';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/ui/NavBar';
import { PropiedadesExclusivas } from '../components/PropiedadesExclusivas';
import { AurelianFooter } from '../components/home/AurelianFooter';
import { CinematicServices } from '../components/home/CinematicServices';
import { FinalCta } from '../components/home/FinalCta';
import { ResultsSection } from '../components/home/ResultsSection';
import { StrategicLocations } from '../components/home/StrategicLocations';
import { TestimonialsSection } from '../components/home/TestimonialsSection';

export const HomePage = (): React.JSX.Element => {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <PropiedadesExclusivas />
      <CinematicServices />
      <ResultsSection />
      <StrategicLocations />
      <TestimonialsSection />
      <FinalCta />
      <AurelianFooter />
    </main>
  );
};

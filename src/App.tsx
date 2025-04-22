import React from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Introduction } from './components/sections/Introduction';
import { MappingTypes } from './components/sections/MappingTypes';
import { WhyItWorks } from './components/sections/WhyItWorks';
import { InteractiveApplet } from './components/sections/InteractiveApplet';
import { Conclusion } from './components/sections/Conclusion';

function App() {
  return (
    <Layout>
      <Hero />
      <Introduction />
      <MappingTypes />
      <WhyItWorks />
      <InteractiveApplet />
      <Conclusion />
    </Layout>
  );
}

export default App;

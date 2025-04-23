import React from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Introduction } from './components/sections/Introduction';
import { MappingTypes } from './components/sections/MappingTypes';
import { WhyItWorks } from './components/sections/WhyItWorks';
import { Conclusion } from './components/sections/Conclusion';
import { ConformMapping } from './components/sections/ConformMapping';

function App() {
  return (
    <Layout>
      <Hero />
      <Introduction />
      <MappingTypes />
      <WhyItWorks />
      <ConformMapping />
      <Conclusion />
    </Layout>
  );
}

export default App;

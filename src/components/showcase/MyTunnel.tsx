'use client';

import React from 'react';
import TunnelScroll from 'react-3d-tunnel-scroll';
import 'react-3d-tunnel-scroll/style.css'; // Import the CSS!

const experienceData = [
  { year: '2024', role: 'Senior UX Designer', company: 'Studio X', description: 'Led redesign of core digital products and established a new design system.' },
  { year: '2022', role: 'Product Designer', company: 'TechCorp', description: 'Spearheaded UI/UX for the flagship mobile application.' },
  { year: '2020', role: 'UI Designer', company: 'Creative Agency', description: 'Worked on various client projects, creating engaging landing pages.' },
  { year: '2018', role: 'Junior Designer', company: 'Startup Inc', description: 'Assisted in branding and web design.' },
];

const MyTunnel = () => {
  const tunnelData = experienceData.map((exp) => ({
    id: exp.year,
    title: `${exp.role} @ ${exp.company}`,
    img: `https://picsum.photos/seed/${exp.company}/800/1200`,
  }));

  return (
    <div>
      <TunnelScroll 
        projects={tunnelData}
        zSpacing={2500}
        label="EXPERIENCE"
        backgroundColor="#000000"
        textColor="#ffffff"
      />
    </div>
  );
};

export default MyTunnel;

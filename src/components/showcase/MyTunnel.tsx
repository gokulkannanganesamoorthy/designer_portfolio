'use client';

import React from 'react';
import TunnelScroll from 'react-3d-tunnel-scroll';
import 'react-3d-tunnel-scroll/style.css'; // Import the CSS!

const experienceData = [
  { year: 'Feb 2025 - Dec 2025', role: 'Founder', company: 'Luno Tech' },
  {
    year: 'Jan 2026 - Jul 2026',
    role: 'Tech & Operations Associate',
    company: 'Orrayson Studio',
  },
  {
    year: 'Jun 2026 - Present',
    role: 'Founding Member & Tech Head',
    company: 'TAT (The Ads Tag)',
  },
  {
    year: 'Jun 2026 - Present',
    role: 'Digital Experience Designer',
    company: 'Independent',
  },
];

const MyTunnel = () => {
  const tunnelData = experienceData.map((exp, index) => ({
    id: `${exp.company}-${index}`,
    title:
      exp.company === 'Independent' ? exp.role : `${exp.role} @ ${exp.company}`,
    img: `https://picsum.photos/seed/${exp.company.replace(/\s+/g, '')}/800/1200`,
  }));

  return (
    <div>
      <TunnelScroll
        projects={tunnelData}
        zSpacing={2500}
        initialZ={1500}
        label="EXPERIENCE"
        backgroundColor="#000000"
        textColor="#ffffff"
      />
    </div>
  );
};

export default MyTunnel;

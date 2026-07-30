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

const generateSvgImage = (company: string, role: string, year: string, index: number) => {
  const bg = '#0a0a0a';
  const grid = '#1a1a1a';
  const fonts = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  
  const svg = `
    <svg width="800" height="1200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="1200" fill="${bg}" />
      
      <!-- Grid Pattern -->
      <pattern id="grid-${index}" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="${grid}" stroke-width="1"/>
      </pattern>
      <rect width="800" height="1200" fill="url(#grid-${index})" />
      
      <!-- Decorative Crosshairs -->
      <path d="M 70,120 L 90,120 M 80,110 L 80,130" stroke="#444" stroke-width="2" />
      <path d="M 710,120 L 730,120 M 720,110 L 720,130" stroke="#444" stroke-width="2" />
      <path d="M 70,1080 L 90,1080 M 80,1070 L 80,1090" stroke="#444" stroke-width="2" />
      <path d="M 710,1080 L 730,1080 M 720,1070 L 720,1090" stroke="#444" stroke-width="2" />
      
      <!-- Top Line -->
      <rect x="80" y="120" width="640" height="1" fill="#333" />
      
      <!-- Year Badge -->
      <rect x="80" y="100" width="240" height="40" fill="#ffffff" />
      <text x="200" y="126" font-family="monospace" font-size="16" font-weight="bold" fill="#000000" text-anchor="middle" letter-spacing="1">${year.toUpperCase()}</text>
      
      <!-- Index / Serial -->
      <text x="720" y="100" font-family="monospace" font-size="16" fill="#666666" text-anchor="end">EXP // 0${index + 1}</text>
      
      <!-- Main Content -->
      <g transform="translate(80, 600)">
        <text x="0" y="0" font-family="${fonts}" font-weight="900" font-size="72" fill="#ffffff" letter-spacing="-0.03em">${company.toUpperCase()}</text>
      </g>
      
      <g transform="translate(80, 660)">
        <text x="0" y="0" font-family="${fonts}" font-weight="400" font-size="32" fill="#888888">${role}</text>
      </g>
      
      <!-- Bottom Decorative Bar -->
      <rect x="80" y="1080" width="640" height="1" fill="#333" />
      <rect x="80" y="1075" width="40" height="11" fill="#444" />
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const MyTunnel = () => {
  const tunnelData = experienceData.map((exp, index) => ({
    id: `${exp.company}-${index}`,
    title: exp.company === 'Independent' ? exp.role : `${exp.role} @ ${exp.company}`,
    img: generateSvgImage(exp.company, exp.role, exp.year, index),
  }));

  return (
    <div>
      <TunnelScroll
        projects={tunnelData}
        zSpacing={2500}
        initialZ={5000}
        label="EXPERIENCE"
        backgroundColor="#000000"
        textColor="#ffffff"
      />
    </div>
  );
};

export default MyTunnel;

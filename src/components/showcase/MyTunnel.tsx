'use client';

import React from 'react';
import TunnelScroll from 'react-3d-tunnel-scroll';
import 'react-3d-tunnel-scroll/style.css'; // Import the CSS!

const MyTunnel = () => {
  const myProjects = [
    {
      id: '01',
      title: 'NIKE AIR',
      img: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=2000'
    },
    {
      id: '02',
      title: 'RED BULL',
      img: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2000'
    }
  ];

  return (
    <div>
      <TunnelScroll 
        projects={myProjects}
        zSpacing={3000}
        label="PORTFOLIO"
        backgroundColor="#040404"
        textColor="#f7f4ed"
      />
    </div>
  );
};

export default MyTunnel;

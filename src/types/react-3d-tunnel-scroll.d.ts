declare module 'react-3d-tunnel-scroll' {
  import React from 'react';

  export interface TunnelScrollProps {
    projects: { id: string; title: string; img: string }[];
    zSpacing?: number;
    initialZ?: number;
    label?: string | null;
    backgroundColor?: string;
    textColor?: string;
    className?: string;
  }

  const TunnelScroll: React.FC<TunnelScrollProps>;
  export default TunnelScroll;
}

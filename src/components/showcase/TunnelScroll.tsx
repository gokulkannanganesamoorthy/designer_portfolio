"use client";

import React, { useMemo } from "react";
import OriginalTunnelScroll from "react-3d-tunnel-scroll";
import "react-3d-tunnel-scroll/style.css";

// Polyfill React 18 internals for older libraries (like react-3d-tunnel-scroll) on React 19
if (!(React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    ReactCurrentDispatcher: { current: null },
    ReactCurrentOwner: { current: null },
    ReactDebugCurrentFrame: { setExtraStackFrame: () => {} }
  };
}

interface TunnelScrollProps {
  projects: { id: string; title: string; img: string }[];
  zSpacing?: number;
  label?: string | null;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

// React 19 Adapter for React 18 pre-bundled JSX components
function convertReact18to19(node: any): any {
  if (!node || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map(convertReact18to19);
  
  if (node.$$typeof === Symbol.for('react.element')) {
    const newProps = { ...node.props };
    if (node.key !== null) newProps.key = node.key;
    if (node.ref !== null) newProps.ref = node.ref;
    
    const children = newProps.children;
    delete newProps.children;

    if (children === undefined) {
      return React.createElement(node.type, newProps);
    }
    
    return React.createElement(
      node.type,
      newProps,
      ...(Array.isArray(children) ? children.map(convertReact18to19) : [convertReact18to19(children)])
    );
  }
  
  return node;
}

export default function TunnelScroll(props: TunnelScrollProps) {
  // Call the component as a function to execute its hooks within our valid component
  // Then recursively fix the returned React 18 element tree for React 19
  const oldElementTree = (OriginalTunnelScroll as any)(props);
  const newElementTree = convertReact18to19(oldElementTree);
  return newElementTree;
}

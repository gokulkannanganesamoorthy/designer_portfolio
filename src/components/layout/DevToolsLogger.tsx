"use client";

import { useEffect } from "react";

export default function DevToolsLogger() {
  useEffect(() => {
    // Only log once per session
    if (sessionStorage.getItem("hasLoggedDevTools")) return;
    
    console.log(
      "%cWelcome to my portfolio! Let's build something great together.",
      "font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif; font-size: 14px; color: #a1a1aa;"
    );
    
    sessionStorage.setItem("hasLoggedDevTools", "true");
  }, []);

  return null;
}
